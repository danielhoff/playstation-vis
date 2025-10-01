<script lang="ts">
    import Filter from "./ui-library/Filter.svelte";
    import type { Kind, Component, Filters } from "$lib/types";
    import { kindFilter, componentFilter, filters } from "$lib/stores/data.svelte";

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
<hr />