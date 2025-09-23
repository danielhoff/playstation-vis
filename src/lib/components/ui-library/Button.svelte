<script lang="ts">
    interface Props {
        label?: string;
        type?: 'primary' | 'secondary'
    }

    let {
        label = '',
        type = 'primary'
    }: Props = $props();

</script>

<button>
    {label}
</button>
