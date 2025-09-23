<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/ui-library/Button.svelte';

	let { children } = $props();

	type Theme = 'light' | 'dark';

	let theme:Theme = $state('light');

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Dark class goes here :) -->
<div class="{theme} bg-(--background-color) p-(--space-xl) h-dvh w-dvw">
	<Button onClick={() => toggleTheme()} size="circ" label="toggle dark/light mode"></Button>
	<h1 class="font-space-mono text-ps-blue">This appears on all pages</h1>

	{@render children?.()}
</div>
