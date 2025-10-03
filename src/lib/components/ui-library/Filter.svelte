<script lang="ts">
    import Svelecte from 'svelecte';
    import type { FilterOption } from '$lib/types';

    interface Props {
        options: FilterOption[];
        multiple?: boolean;
        searchable?: boolean;
        max?: number;
        onChangeEvent: (value:Array<string>) => void;
    }

    let {
        options = [],
        multiple = true,
        searchable = true,
        max = 0,
        onChangeEvent
    }: Props = $props();

    let value = $state([]);

    const handleChange = () => {
        onChangeEvent(value);
    }
</script>

<Svelecte onChange={handleChange} options={options} searchable={searchable}  multiple={multiple} closeAfterSelect={true} max={max} bind:value={value}></Svelecte>