import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import type { Boundaries, Metric, Group, BoundariesFormatted } from '$lib/types.ts';
import { julianToDate } from '$lib/utils/julianToDate';

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

export function boundariesFormatted(): BoundariesFormatted {
  return convertBoundariesFormatted();
}