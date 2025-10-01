<script lang="ts">
import Svelecte from 'svelecte';
import type { FilterList } from '$lib/types';

interface Props {
    options: FilterList[];
    multiple?: boolean;
    searchable?: boolean;
    onChangeEvent: (value:Array<number>) => void;
}

let {
    options = [],
    multiple = true,
    searchable = true,
    onChangeEvent
}: Props = $props();

let value = $state([]);

const handleChange = () => {
    onChangeEvent(value);
}
</script>

<Svelecte onChange={handleChange} options={options} searchable={searchable}  multiple={multiple} bind:value={value}></Svelecte>