<script lang="ts">
    import Filter from "./ui-library/Filter.svelte";
    import type { Kind, Component, Filters, GlobalDescription } from "$lib/types";
    import { kindFilter, componentFilter, descriptionFilter, processDescriptionFilter, filters } from "$lib/stores/chartFilters.svelte";

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
</script>

<h3>Filters</h3>

<div class="flex mt-(--space-sm)">
    <div class="w-1/2">
        <div class="w-1/3">
            <p>Kind:</p>
        </div>
        
        <Filter onChangeEvent={(value) => updateFilters(value as Kind[], 'kind')} options={kindFilter}></Filter>    
    </div>
    <div class="w-1/2">
        <div class="w-1/3">
            <p>Component:</p>
        </div>
    
        <Filter onChangeEvent={(value) => updateFilters(value as Component[], 'component')} options={componentFilter}></Filter>
    </div>
</div>

<div class="flex mt-(--space-sm)">
    <div class="w-1/2">
        <div class="w-1/3">
            <p>Description(Process):</p>
        </div>
        <Filter onChangeEvent={(value) => updateFilters(value as string[], 'processDescription')} options={processDescriptionFilter}></Filter>
    </div>
    
    <div class="w-1/2">
        <div class="w-1/3">
            <p>Description(Global):</p>
        </div>
        <Filter onChangeEvent={(value) => updateFilters(value as GlobalDescription[], 'description')} options={descriptionFilter}></Filter>
    </div>
</div>