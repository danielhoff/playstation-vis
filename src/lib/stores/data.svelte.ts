import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import { julianToDate } from '$lib/utils/julianToDate';
import type { Boundaries, Metric, Group, BoundariesFormatted, Point } from '$lib/types.ts';

// makes all 3 possible to grab the data like metricsData[0] rather than metricsData.metrics[0]
export const boundariesData = $state<Boundaries>(boundariesJson.boundaries);

export const metricsData = $state<Metric[]>(
  (metricsJson as { metrics: Metric[] }).metrics
);

export const groupsData = $state<Group[]>(
  (groupsJson as { groups: Group[] }).groups
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
                if (i < start || i > end) {
                    return false;
                }

                points.push({
                    boundary: boundaries[i],
                    value: value,
                    label: `${component}-${group}`
                });
            })
        }

        return points;
    }