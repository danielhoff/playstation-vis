import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import { julianToDate } from '$lib/utils/julianToDate';
import type { Boundaries, Metric, Group, GroupsMap, BoundariesFormatted, Point } from '$lib/types.ts';
import { SvelteMap } from 'svelte/reactivity';

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

// format the timestamps to data D3 can use
const convertBoundariesFormatted = $derived(() => {
  return boundariesData.map((boundary) => julianToDate(boundary));
})

export const boundariesFormatted = ():BoundariesFormatted => {
  return convertBoundariesFormatted();
}

// returns an array of points to map to the chart
export const generatePoints = (metrics: Metric[], boundaries: Date[]): Point[] => {
    const points: Point[] = [];

    for (const metric of metrics) {
        const { start, end, component, group, data} = metric;

        data.forEach((value, i) => {
            // if outside the metrics start/end time, don't plot
            if (i < start || i > end) {
                return false;
            }

            // using map instead of something like array.find as the performance cost was expensive
            const relatedGroup = groupsMap.get(group);

            points.push({
                boundary: boundaries[i],
                value: value,
                label: `${component}-${group}`,
                // ! = negate TS complaing about it potentially being undefined - however we know it won't be. It will still flag up unexpected data types
                group: relatedGroup!
            });
        })
    }

    return points;
}