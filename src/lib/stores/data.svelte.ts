import { SvelteMap } from 'svelte/reactivity';
import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import { julianToDate } from '$lib/utils/julianToDate';
import type { Boundaries, Metric, Group, GroupsMap, BoundariesFormatted, Point, Colors, OKLCHFormat, GlobalDescription, Filters, FilterOption} from '$lib/types.ts';

// makes all 3 possible to grab the data like metricsData[0] rather than metricsData.metrics[0]
export const boundariesData = $state<Boundaries>(boundariesJson.boundaries);

export const metricsData = $state<Metric[]>(
  (metricsJson as { metrics: Metric[] }).metrics
);

export const groupsData = $state<Group[]>(
  (groupsJson as { groups: Group[] }).groups
);

export const groupsMap:GroupsMap = new SvelteMap(
  groupsData.map(g => [g.id, g] as const)
);

export const boundariesFormatted = ():BoundariesFormatted => {
  return convertBoundariesFormatted();
}

export const processDescriptions = $state<string[]>([]);

export const filters = $state<Filters>({
  kind: [],
  component: [],
  description: [],
  processDescription: []
});

export const kindFilter:Array<FilterOption> = [
  { value: 'global', label: 'Global' },
  { value: 'process', label: 'Process' }
];

export const componentFilter:Array<FilterOption> = [
  { value: 'in use', label: 'In use' },
  { value: 'modified', label: 'Modified' },
  { value: 'standby', label: 'Standby' },
  { value: 'free', label: 'Free' },
  { value: 'user', label: 'User' },
  { value: 'kernel', label: 'Kernel' },
  { value: 'sent', label: 'Sent' },
  { value: 'received', label: 'Received' }
];

export const descriptionFilter:Array<FilterOption> = [
  { value: 'memory', label: 'Memory' },
  { value: 'network', label: 'Network' },
  { value: 'cpu', label: 'CPU'}
]

export const processDescriptionFilter:Array<FilterOption> = []

// light theme
export const colorsLight:Colors = {
  memory: 'oklch(42.392% 0.20821 269.97)',
  cpu: 'oklch(72.061% 0.11854 190.64)',
  network: 'oklch(56.295% 0.22634 27.822)',
  process: 'oklch(63.9% 0.22675 356.89)',
}

// dark theme
export const colorsDark:Colors = {
  memory: 'oklch(42.392% 0.20821 269.97)',
  cpu: 'oklch(72.061% 0.11854 190.64)',
  network: 'oklch(56.295% 0.22634 27.822)',
  process: 'oklch(63.9% 0.22675 356.89)',
}

// returns an array of points to map to the chart
export const generatePoints = (metrics: Metric[], boundaries: Date[]): Point[] => {
    const points: Point[] = [];

    for (const metric of metrics) {
        const { start, end, component, group, data} = metric;
        const relatedGroup = groupsMap.get(group);

        if (relatedGroup?.kind === 'process') {
          if (!processDescriptions.includes(relatedGroup.description)) {
            processDescriptions.push(relatedGroup.description);
          }
        }

        data.forEach((value, i) => {
            // if outside the metrics start/end time, don't plot
            if (i < start || i > end) {
                return false;
            }

            points.push({
                boundary: boundaries[i],
                value: value,
                label: `${component}-${group}`,
                component: component,
                groupId: group
            });
        })
    }

    createProcessDescriptionFilter();
    return points;
}

export const getLineColor = (point: Point, colors: Colors) :OKLCHFormat => {
  const relatedGroup = groupsMap.get(point.groupId);
  const { kind, description } = relatedGroup as Group;
    if (kind === 'global') {
        return colors[description as GlobalDescription];
    } else {
        return colors.process;
    }
}

// filters - cascading filtering 
export const filteredGroupedPoints = (groupedPoints: Map<string, Point[]>) :SvelteMap<string,Point[]> => {
    const currentFilters = $state.snapshot(filters);

    const filtered = Array.from(groupedPoints)
      // the label/key is first in the array here, but we don't need it for this
      .filter(([, points]) => {
        const firstPoint = points[0];
        const relatedGroup = groupsMap.get(firstPoint.groupId);
        // this keeps TS happy
        if (!relatedGroup) return false;

        return (Object.entries(currentFilters) as [keyof Filters, string[]][])
          .every(([key, filtervalues]) => {
          console.log(key, filtervalues);

          if (!filtervalues || filtervalues.length === 0) return true;

          let value: string;

          switch (key) {
              case 'kind':
                  value = relatedGroup.kind;
                  break;
              case 'component':
                  value = firstPoint.component;
                  break;
              case 'description':
              case 'processDescription':
                  value = relatedGroup.description;
                  break;
              default:
                  return true;
          }

          return (filtervalues as string[]).includes(value);
      });
    });

    return new SvelteMap(filtered);
}

const createProcessDescriptionFilter = () => {
  for (const description of $state.snapshot(processDescriptions)) {
    processDescriptionFilter.push({
      value: description,
      label: description
    });
  }
}

// format the timestamps to data D3 can use
const convertBoundariesFormatted = $derived(() => {
  return boundariesData.map((boundary) => julianToDate(boundary));
});