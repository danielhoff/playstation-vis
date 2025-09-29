import boundariesJson from '$lib/data/boundaries.json';
import metricsJson from '$lib/data/metrics.json';
import groupsJson from '$lib/data/groups.json';
import type { Boundaries, Metric, Group } from '$lib/types.ts';

export const boundariesData = $state<Boundaries>(boundariesJson.boundaries);

export const metricsData = $state<Metric[]>(
  (metricsJson as { metrics: Metric[] }).metrics
);

export const groupsData = $state<Group[]>(
  (groupsJson as { groups: Group[] }).groups
);