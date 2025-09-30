<script lang="ts">
    import { randomInt } from "$lib/utils/randomNumber";
    import type { SymbolId } from "$lib/types";
	import { getTheme } from "$lib/stores/theme.svelte";

    const symbols: {
        id: SymbolId,
        translateOriginal: string,
        translateHidden: string
    }[] = [
        { id: 'triangle', translateOriginal: '0, 4', translateHidden: '-240, 4'},
        { id: 'square', translateOriginal: '60, 0', translateHidden: '-180, 0'},
        { id: 'circle', translateOriginal: '116, 0', translateHidden: '-125, 0'},
        { id: 'cross', translateOriginal: '170, 0', translateHidden: '-70, 0'}
    ]

    const defaultStroke:string = 'oklch(88.474% 0.00883 264.52);';

    const strokeAnimation:Record<SymbolId, string> = {
        triangle: `${defaultStroke} oklch(84.843% 0.10897 191.64); ${defaultStroke}`,
        square: `${defaultStroke} oklch(79.755% 0.1178 349.68); ${defaultStroke}`,
        circle: `${defaultStroke} oklch(68.395% 0.18625 20.809); ${defaultStroke}`,
        cross: `${defaultStroke} oklch(63.208% 0.14739 277.81); ${defaultStroke}`
    }

    const triangleAnimationDelay = randomInt(30, 300);
    const squareAnimationDelay = randomInt(30, 300);
    const circleAnimationDelay = randomInt(30, 300);
    const crossAnimationDelay = randomInt(30, 300);

</script>

<div class="{getTheme()} h-dvh w-dvw absolute z-[-1] bg-(--background-color)">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-labelledby="title desc">
        <defs>
            <polygon id="triangle" points="32,8 56,48 8,48" fill="none" opacity="1" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linejoin="round">
                <animate id="triangleAni" attributeName="stroke" values={strokeAnimation.triangle} begin="{triangleAnimationDelay}; triangleAni.end+{triangleAnimationDelay}" keyTimes="0;0.5;1" dur="3" repeatCount="1"/>
            </polygon>

            <rect id="square" x="12" y="12" width="40" height="40" fill="none" opacity="1" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4">
                <animate id="squareAni" attributeName="stroke" values="{strokeAnimation.square}" begin="{squareAnimationDelay};  squareAni.end+{squareAnimationDelay}" keyTimes="0;0.5;1" dur="3" repeatCount="1"/>
            </rect>

            <circle id="circle" cx="32" cy="32" r="20" fill="none" opacity="1" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4">
                <animate id="circleAni" attributeName="stroke" values="{strokeAnimation.circle}" begin="{circleAnimationDelay}; circleAni.end+{circleAnimationDelay}" keyTimes="0;0.5;1" dur="3" repeatCount="1"/>
            </circle>

            <g id="cross" transform="translate(32,32)">
                <line x1="-20" y1="-20" x2="20" y2="20" opacity="1" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round">
                    <animate id="crossAni" attributeName="stroke" values="{strokeAnimation.cross}" begin="{crossAnimationDelay}; crossAni.end+{crossAnimationDelay}" keyTimes="0;0.5;1" dur="3" repeatCount="1"/>
                </line>
                <line x1="-20" y1="20" x2="20" y2="-20" opacity="1" stroke="oklch(88.474% 0.00883 264.52)" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="stroke" values="{strokeAnimation.cross}" begin="crossAni.begin" keyTimes="0;0.5;1" dur="3" repeatCount="1"/>
                </line>
            </g>

            <pattern viewBox="0 0 240 50" width="40" height="10" id="symbols" patternUnits="userSpaceOnUse">
                <g>
                    {#each symbols as symbol }
                        <g transform="{`translate(${symbol.translateOriginal})`}">
                            <use href={`#${symbol.id}`}></use>
                        </g>

                        <g transform="{`translate(${symbol.translateHidden})`}">
                            <use href={`#${symbol.id}`}></use>
                        </g>
                    {/each}
            
                    <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        from="0 0" 
                        to="240 0" 
                        dur="15"
                        repeatCount="indefinite"
                    />
                </g>
            </pattern>
        </defs>

        <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#symbols)"></rect>
    </svg>
</div>