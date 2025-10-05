import { SvelteMap } from 'svelte/reactivity';
import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import { julianToDate } from '$lib/utils/julianToDate';
import type { Boundaries, Metric, Group, GroupsMap, BoundariesFormatted, Point, Colors, OKLCHFormat, GlobalDescription} from '$lib/types.ts';


// makes all 3 possible to grab the data like metricsData[0] rather than metricsData.metrics[0]
export const boundariesData = $state<Boundaries>(boundariesJson.boundaries);
export const metricsData = $state<Metric[]>(
  (metricsJson as { metrics: Metric[] }).metrics
);
export const groupsData = $state<Group[]>(
  (groupsJson as { groups: Group[] }).groups
);

// formatted boundaries (d3 friendly)
export const boundariesFormatted = ():BoundariesFormatted => {
  return convertBoundariesFormatted();
}

// group map for performance saving look ups.
export const groupsMap:GroupsMap = new SvelteMap(
  groupsData.map(g => [g.id, g] as const)
);

export const flattenGroupedPoints = (groupedPoints:Map<string, Point[]>): Point[]  => {
  return Array.from(groupedPoints.values()).flat();
}

export const processDescriptions = $state<string[]>([]);

// light theme
export const colorsLight:Colors = {
  memory: 'oklch(63.208% 0.14739 277.81)',
  cpu: 'oklch(84.843% 0.10897 191.64)',
  network: 'oklch(68.395% 0.18625 20.809)',
  process: 'oklch(79.755% 0.1178 349.68)',
}

// dark theme
export const colorsDark:Colors = {
  memory: 'oklch(72.25% 0.10763 279.19)',
  cpu: 'oklch(87.861% 0.08834 192.1)',
  network: 'oklch(74.792% 0.14004 18.277)',
  process: 'oklch(82.448% 0.10005 348.83)',
}

// returns an array of points to map to the chart, ready to be grouped into lines
// this only runs once on page load. It's expensive but once ran, we can redraw the chart without having to call this again
export const generatePoints = (metrics: Metric[], boundaries: Date[]): Point[] => {
    const points: Point[] = [];


    for (const metric of metrics) {
        const { start, end, component, group, data} = metric;
        const relatedGroup = groupsMap.get(group);

        // here we create the array of process descriptions used for the filter
        if (relatedGroup?.kind === 'process') {
          if (!processDescriptions.includes(relatedGroup.description)) {
            processDescriptions.push(relatedGroup.description);
          }
        }

        data.forEach((value, i) => {
            // if outside the metrics start/end time, don't plot
            if (i < start || i > end) return false;

            points.push({
                boundary: boundaries[i],
                value: value,
                label: `${component}-${group}`,
                component: component,
                groupId: group
            });
        })
    }
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

const convertBoundariesFormatted = $derived(() => {
  return boundariesData.map((boundary) => julianToDate(boundary));
});