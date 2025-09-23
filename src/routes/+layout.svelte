<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/ui-library/Button.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Dark class goes here :) -->
<div class="bg-(--background-color) p-(--space-xl) h-dvh w-dvw">
	<h1 class="font-space-mono text-ps-blue">This appears on all pages</h1>
	<Button></Button>

	{@render children?.()}
</div>
