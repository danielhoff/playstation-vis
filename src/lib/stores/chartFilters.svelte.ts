import { SvelteMap } from 'svelte/reactivity';
import { boundariesFormatted, groupsMap, processDescriptions } from '$lib/stores/chart.svelte';
import type { Filters, FilterOption, Point} from '$lib/types.ts';
import { formatDate } from '$lib/utils/formatDate';

export const filters = $state<Filters>({
  kind: [],
  component: [],
  description: [],
  processDescription: []
});

export const timeFilter:Array<FilterOption> = [];
export const timeFilterValue = $state<Date[]>([]);

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

export const processDescriptionFilter:Array<FilterOption> = [];

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

        return (Object.entries(currentFilters) as [keyof Filters, string|[]][])
          .every(([key, filterValues]) => {

          if (!filterValues || filterValues.length === 0) return true;

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

          return (filterValues as string[]).includes(value);
      });
    });

    return new SvelteMap(filtered);
}

export const onTimeFilterChange = (value: Date[]) => {
  timeFilterValue.length = 0; 
  timeFilterValue.push(...value.sort((a, b) => a.getTime() - b.getTime()));
}

export const createDynamicFilters = () => {
  createTimeFilter();
  createProcessDescriptionFilter();
}

const createProcessDescriptionFilter = () => {
  for (const description of $state.snapshot(processDescriptions)) {
    processDescriptionFilter.push({
      value: description,
      label: description
    });
  }
}

const createTimeFilter = () => {
  for (const time of $state.snapshot(boundariesFormatted())) {
    timeFilter.push({
      value: time,
      label: formatDate(time)
    })
  }
}