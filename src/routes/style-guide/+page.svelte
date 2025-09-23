
<script lang="ts">
    import Button from '$lib/components/ui-library/Button.svelte';
</script>


<h2>Buttons</h2>
<div class="flex">
    <div class="w-8 flex-1">
        <Button label="Primary Small" size="sm"></Button> 
        <Button label="Secondary Small" size="sm" type="secondary"></Button>
        <Button label="Warning Small" size="sm" type="warning"></Button> 
    </div>
    
    <div class="w-8 flex-1">
        <Button label="Primary Medium" size="md"></Button> 
        <Button label="Secondary Medium" size="md" type="secondary"></Button>
        <Button label="Warning Medium" size="md" type="warning"></Button>  
    </div>

    <div class="w-8 flex-1">
        <Button label="Primary Large" size="lg"></Button>
        <Button label="Secondary Large" size="lg" type="secondary"></Button>
        <Button label="Warning Large" size="lg" type="warning"></Button>
    </div>
</div>

<Button size="circ" label="hi"></Button>