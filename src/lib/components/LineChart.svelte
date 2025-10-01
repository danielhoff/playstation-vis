<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from "svelte";
    import type { BoundariesFormatted, Metric, Point, Theme, Colors, GlobalDescription } from '$lib/types';
    import { getTheme } from '$lib/stores/theme.svelte';
    import { metricsData, groupsData, boundariesFormatted, generatePoints, colorsDark, colorsLight, getLineColor, filteredGroupedPoints} from '$lib/stores/data.svelte';
    import Button from './ui-library/Button.svelte';

    const boundaries:BoundariesFormatted = boundariesFormatted();

    const width:number = 1700;
    const height:number = 800;
    const marginTop:number = 20;
    const marginRight:number = 20;
    const marginBottom:number = 30;
    const marginLeft:number = 100;

    const theme:Theme = getTheme();
    let colors:Colors;

    if (theme === 'light') {
        colors = colorsLight;
    } else {
        colors = colorsDark;
    }

    const x = d3.scaleUtc()
        .domain(d3.extent(boundaries) as [Date, Date])
        .range([marginLeft, width - marginRight]);

    // needs the extra check to failsafe to a number
    const yMax = d3.max(metricsData.flatMap(metric => metric.data)) ?? 0;

    const y = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - marginBottom, marginTop]);

    const points = generatePoints(metricsData, boundaries);

    $inspect(points);

    // groups the points by label to get the line (metric.component-metric.group)
    let groupedPoints = d3.rollup(points, value => value, d => d.label);

    $inspect(groupedPoints);

    const line = d3.line<Point>()
        .x(d => x(d.boundary))
        .y(d => y(d.value));
    
    let svg:d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;
    let dot:d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;

    onMount(() => {
        const onPointerEnter = () => {
            dot.attr('display', null);
        }

        const onPointerLeave = () => {
            svg.selectAll<SVGPathElement, Point[]>('.data-line')
                .style('opacity', 1);
            
            dot.attr('display', 'none');
        }

        const onPointerMove = (event: PointerEvent) => {
            const [xm, ym] = d3.pointer(event);

            const i = d3.leastIndex(points, p => 
                Math.hypot(x(p.boundary) - xm, y(p.value) - ym));
                
            // TS guard against undefined
            if (i === undefined) return;

            const selectedPoint = points[i];

            svg.selectAll<SVGPathElement, Point[]>('.data-line')
                 // can use [0] here to get the label as all points on a line have the same label
                .style('opacity', d => d[0].label === selectedPoint.label ? '1' : '0.1')
                .filter(d => d[0].label === selectedPoint.label)
                .raise();

            dot.attr('transform', `translate(${x(selectedPoint.boundary)}, ${y(selectedPoint.value)})`);
            dot.select("text").text(`${selectedPoint.label} [${selectedPoint.boundary}, ${selectedPoint.value}]`);
        }

        svg = d3.select<SVGSVGElement, unknown>('#line-chart')
            .on('pointermove', onPointerMove)
            .on('pointerenter', onPointerEnter)
            .on('pointerleave', onPointerLeave);

        dot = svg.append('g')
            .attr('display', 'none');
        
        dot.append('circle')
            .attr('r', 2.5);
        
        dot.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -8);
        
        drawChart();
    });

    const drawChart = () => {
        svg.attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;')

        // x axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        
        // y axis
        svg.append('g')
            .attr('transform', `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(y));

        // drawing lines
        svg.append('g')
            .attr('fill', 'none')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .selectAll('path')
            .data(groupedPoints.values())
            .join('path')
            .attr('stroke', d => getLineColor(d[0], colors))
            .attr('class', 'data-line')
            .attr('d', line);
    }

    const handleClick = (event:MouseEvent) => {
        groupedPoints = filteredGroupedPoints(groupedPoints);
    }

</script>

<div>
    <svg id="line-chart"></svg>
    <!-- <Button onclick={handleClick}>Filter!</Button> -->
</div>