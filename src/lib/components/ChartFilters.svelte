<script lang="ts">
    import Filter from "./ui-library/Filter.svelte";
    import type { Kind, Component, Filters, GlobalDescription } from "$lib/types";
    import { kindFilter, componentFilter, descriptionFilter, processDescriptionFilter, filters } from "$lib/stores/data.svelte";

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

<Filter onChangeEvent={(value) => updateFilters(value as Kind[], 'kind')} options={kindFilter}></Filter>
<Filter onChangeEvent={(value) => updateFilters(value as Component[], 'component')} options={componentFilter}></Filter>
<Filter onChangeEvent={(value) => updateFilters(value as string[], 'processDescription')} options={processDescriptionFilter}></Filter>
<Filter onChangeEvent={(value) => updateFilters(value as GlobalDescription[], 'description')} options={descriptionFilter}></Filter>
<hr />