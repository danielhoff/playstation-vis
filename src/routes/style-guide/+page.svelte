
<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import Button from '$lib/components/ui-library/Button.svelte';
</script>

<Container>
    <div class="p-(--space-lg)">
        <h1>Style Guide</h1>
        <hr>
        <h2>Buttons</h2>
        <div class="flex">
            <div class="w-1/3 flex-1">
                <Button label="Primary Small" size="sm"></Button> 
                <Button label="Secondary Small" size="sm" type="secondary"></Button>
                <Button label="Warning Small" size="sm" type="warning"></Button> 
            </div>
            
            <div class="w-1/3 flex-1">
                <Button label="Primary Medium" size="md"></Button> 
                <Button label="Secondary Medium" size="md" type="secondary"></Button>
                <Button label="Warning Medium" size="md" type="warning"></Button>  
            </div>

            <div class="w-1/3 flex-1">
                <Button label="Primary Large" size="lg"></Button>
                <Button label="Secondary Large" size="lg" type="secondary"></Button>
                <Button label="Warning Large" size="lg" type="warning"></Button>
            </div>
        </div>
    </div>
</Container>