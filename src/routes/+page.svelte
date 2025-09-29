<script lang="ts">
    import { metricsData, groupsData, boundariesFormatted } from '$lib/stores/data.svelte';

    $inspect(metricsData[0]);
    $inspect(groupsData[0]);
    $inspect(boundariesFormatted());
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
