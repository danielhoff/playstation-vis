<!-- the hight here is 100% of viewport while also taking into account the various vertical padding/margins used -->
<div class="
    bg-(--background-color)
    mt-(--space-md)
    py-(--space-md)
    rounded-md
    w-full
    h-[calc(100dvh-var(--space-lg)*2-var(--space-md)*4)]
    shadow-(--box-shadow-container)
    ">
    <slot></slot>
</div>