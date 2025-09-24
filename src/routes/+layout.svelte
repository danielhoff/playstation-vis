<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/Background.svelte';
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

<Background></Background>

<!-- Dark class goes here :) -->
<div class="{theme} p-(--space-xl) h-dvh w-dvw">
	<Button onClick={() => toggleTheme()} size="circ" label="toggle dark/light mode"></Button>

	{@render children?.()}
</div>
