import { SvelteMap } from 'svelte/reactivity';
import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import { julianToDate } from '$lib/utils/julianToDate';
import type { Boundaries, Metric, Group, GroupsMap, BoundariesFormatted, Point, Colors, OKLCHFormat, GlobalDescription} from '$lib/types.ts';
import { createProcessDescriptionFilter } from './chartFilters.svelte';

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

export const flattenGroupedPoints = (groupedPoints:Map<string, Point[]>): Point[]  => {
  return Array.from(groupedPoints.values()).flat();
}

// light theme
export const colorsLight:Colors = {
  memory: 'oklch(63.208% 0.14739 277.81)',
  cpu: 'oklch(84.843% 0.10897 191.64)',
  network: 'oklch(68.395% 0.18625 20.809)',
  process: 'oklch(79.755% 0.1178 349.68)',
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

// format the timestamps to data D3 can use
const convertBoundariesFormatted = $derived(() => {
  return boundariesData.map((boundary) => julianToDate(boundary));
});