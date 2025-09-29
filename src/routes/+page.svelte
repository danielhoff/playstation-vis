<script lang="ts">
    import { metricsData, groupsData, boundariesFormatted } from '$lib/stores/data.svelte';
    import Container from '$lib/components/Container.svelte';
    import LineChart from '$lib/components/LineChart.svelte';

    $inspect(metricsData[0]);
    $inspect(groupsData[0]);
    $inspect(boundariesFormatted());
</script>

<Container>
    <LineChart></LineChart>
</Container>


