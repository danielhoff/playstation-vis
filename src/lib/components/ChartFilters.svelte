<script lang="ts">
    import Filter from "./ui-library/Filter.svelte";
    import type { Kind, Component, Filters, GlobalDescription } from "$lib/types";
    import { kindFilter, componentFilter, descriptionFilter, processDescriptionFilter, timeFilter, filters, onTimeFilterChange } from "$lib/stores/chartFilters.svelte";

    interface Props {
        onFilterChange: () => void;
    }

    let {
        onFilterChange
    }: Props = $props();

    const updateFilters = <K extends keyof Filters>(value: Filters[K], filter: K) => {
        filters[filter] = value;
        onFilterChange();
    }

    // handles differently to the other filters
    const updateTimeFilter = (value: string[]) => {
        // multiselect plugin turns value from a Data object to a string - will turn in back here: 
        const dateValues: Date[] = value.map(v => new Date(v));

        // Pass onTimeFilterChange to change the filter value. Then call the filterchange to execute.
        onTimeFilterChange(dateValues);
        onFilterChange();
    }
</script>

<h3>Filters</h3>

<div class="flex mt-(--space-sm) gap-5">
    <div class="w-full">
        <p><span>Y Axis - Time range (2 options required):</span></p>
        
        <Filter onChangeEvent={(value) => updateTimeFilter(value as string[])} options={timeFilter} max={2}></Filter>    
    </div>
</div>

<div class="flex mt-(--space-sm) gap-5">
    <div class="w-1/2">
        <p><span>Kind:</span></p>
        
        <Filter onChangeEvent={(value) => updateFilters(value as Kind[], 'kind')} options={kindFilter}></Filter>    
    </div>
    <div class="w-1/2">
        <p><span>Component:</span></p>
    
        <Filter onChangeEvent={(value) => updateFilters(value as Component[], 'component')} options={componentFilter}></Filter>
    </div>
</div>

<div class="flex mt-(--space-sm) gap-5">
    <div class="w-1/2">
        <p><span>Description (Global):</span></p>
        
        <Filter onChangeEvent={(value) => updateFilters(value as GlobalDescription[], 'description')} options={descriptionFilter}></Filter>
    </div>
    
    <div class="w-1/2">
        <p><span>Description (Process):</span></p>
        
        <Filter onChangeEvent={(value) => updateFilters(value as string[], 'processDescription')} options={processDescriptionFilter}></Filter>
    </div>
</div>