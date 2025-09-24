<script lang="ts">

</script>

<div class="h-dvh w-dvw bg-(--background-color)">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-labelledby="title desc">
        <defs>
            <pattern viewBox="0 0 240 50" width="40" height="10" id="symbols" patternUnits="userSpaceOnUse">
                <g>
                <!-- Triangle -->
                <g transform="translate(0,4)">
                    <polygon points="32,8 56,48 8,48" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linejoin="round" />
                </g>

                <!-- Square -->
                <g transform="translate(60,0)">
                    <rect x="12" y="12" width="40" height="40" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" />
                </g>

                <!-- Circle -->
                <g transform="translate(116,0)">
                    <circle cx="32" cy="32" r="20" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" />
                </g>

                <!-- Cross -->
                <g transform="translate(170,0)">
                    <g transform="translate(32,32)">
                        <line x1="-20" y1="-20" x2="20" y2="20" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round"/>
                        <line x1="-20" y1="20" x2="20" y2="-20" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round"/>
                    </g>
                </g>

                 <!-- Cross -->
                <g transform="translate(-70,0)">
                    <g transform="translate(32,32)">
                    <line x1="-20" y1="-20" x2="20" y2="20" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round"/>
                    <line x1="-20" y1="20" x2="20" y2="-20" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round"/>
                    </g>
                </g>

                <!-- Circle -->
                <g transform="translate(-120,0)">
                    <circle cx="32" cy="32" r="20" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" />
                </g>

                <!-- Square -->
                <g transform="translate(-180,2)">
                    <rect x="12" y="12" width="40" height="40" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" />
                </g>

                

                <!-- triangle -->
                <g transform="translate(-240,4)">
                    <polygon points="32,8 56,48 8,48" fill="none" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linejoin="round" />
                </g>

                

                


                 <animateTransform 
                    attributeName="transform" 
                    type="translate" 
                    from="0 0" 
                    to="240 0" 
                    dur="5" 
                    fill="freeze"
                    repeatCount="indefinite"
                    />
                </g>
            </pattern>
        </defs>

        <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#symbols)"></rect>
    </svg>
</div>

