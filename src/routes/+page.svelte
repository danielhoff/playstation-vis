<script lang="ts">
    import { boundariesData, metricsData, groupsData } from '$lib/stores/data.svelte';

    $inspect(boundariesData[0]);
    $inspect(metricsData[0]);
    $inspect(groupsData[0]);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
