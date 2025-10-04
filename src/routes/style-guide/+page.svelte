
<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import Button from '$lib/components/ui-library/Button.svelte';
    import Filter from '$lib/components/ui-library/Filter.svelte';

    const options = [{value: 'option-1', label: 'Option 1'}, {value: 'option-2', label: 'Option 2'}];

    const onChange = (value:Array<string>) => {
        console.log(value);
    }
</script>

<Container>
    <div class="p-(--space-lg)">
        <div class="flex">
            <h1 class="flex-grow">Style Guide</h1>
            <div class="mt-[8px]">
                <a href="/">
                    <Button type="secondary" label="Home"></Button>
                </a>
            </div>
        </div>
        
        <hr>
        <h2>Typography</h2>
        <hr>
        <div class="flex mb-(--space-md)">
            <div class="w-1/3 flex-1">
                <h1>Title</h1>
                <h2>Heading</h2>
                <h3>Sub Heading</h3>
                <p>Paragraph</p>
                <p><span>Highlight</span></p>
            </div>
        </div>
        <hr>
        <h2>Buttons</h2>
        <hr>
        <div class="flex mb-(--space-md)">
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
        <hr>
        <h2>Filters</h2>
        <hr>
        <div class="w-1/4">
            <Filter onChangeEvent={onChange} options="{options}"></Filter>
        </div> 
    </div>
</Container>