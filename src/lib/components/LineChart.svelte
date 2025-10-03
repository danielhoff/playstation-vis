<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from "svelte";
    import type { BoundariesFormatted, Metric, Point, Theme, Colors, MetaData, Group } from '$lib/types';
    import { getTheme } from '$lib/stores/theme.svelte';
    import { metricsData, groupsMap, boundariesFormatted, generatePoints, colorsDark, colorsLight, getLineColor, flattenGroupedPoints} from '$lib/stores/chart.svelte';
    import { filteredGroupedPoints, createDynamicFilters, timeFilterValue } from '$lib/stores/chartFilters.svelte';
    import ChartFilters from '$lib/components/ChartFilters.svelte';
    import { formatDate } from '$lib/utils/formatDate';

    const boundaries:BoundariesFormatted = boundariesFormatted();

    const theme:Theme = getTheme();
    let colors:Colors;

    if (theme === 'light') {
        colors = colorsLight;
    } else {
        colors = colorsDark;
    }

    let points = generatePoints(metricsData, boundaries);

    createDynamicFilters();

    // groups the points into lines: label is - (metric.component-metric.group)
    let groupedPoints = d3.rollup(points, value => value, d => d.label);
    let groupedPointsFlat:Point[] = $state(flattenGroupedPoints(groupedPoints));

    let svg:d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;
    let dot:d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;

    let meta:MetaData | undefined = $state();

    onMount(() => {
        drawChart();

        window.addEventListener('resize', () => {
            redrawChart();
        });
    });

    const redrawChart = () => {
        d3.selectAll('#line-chart *').remove();
        d3.select('#line-chart')
            .on('mousemove', null)
            .on('mouseenter', null)
            .on('mouseleave', null);
        drawChart();
    }

    const drawChart = () => {
        const container = d3.select('#chart-container').node() as HTMLElement;
        // where the magic happens, main function to trigger the drawing of the chart
        const width:number = getContainerWidth(container);
        const height:number = getContainerHeight(container);
        const marginTop:number = 20;
        const marginRight:number = 20;
        const marginBottom:number = 30;
        const marginLeft:number = 100;

        const x:d3.ScaleTime<number, number> = d3.scaleUtc()
            .domain(
                timeFilterValue && timeFilterValue.length === 2 ? (timeFilterValue as [Date, Date])
                : d3.extent(boundaries) as [Date, Date])
            .range([marginLeft, width - marginRight]);

        // needs the extra check to failsafe to a number
        const yMax:number = d3.max(
            Array.from(groupedPoints.values()).flat().map(p => p.value))
            ?? 0;

        const y:d3.ScaleLinear<number, number> = d3.scaleLinear()
            .domain([0, yMax])
            .range([height - marginBottom, marginTop]);

        const line = d3.line<Point>()
            .x(d => x(d.boundary))
            .y(d => y(d.value));

        drawSVG(width, height, x, y);
        drawXAxis(x, width, height, marginBottom);
        drawYAxis(y, marginLeft);
        drawLines(line);
    }

    const drawSVG = (width:number, height:number, x:d3.ScaleTime<number, number>, y:d3.ScaleLinear<number, number>) => {
        
        const delaunay = d3.Delaunay.from(
            groupedPointsFlat,
            p => x(p.boundary),
            p => y(p.value)
        );

        svg = d3.select<SVGSVGElement, unknown>('#line-chart')
            .on('mousemove', (event: MouseEvent) => onMouseMove(event, x, y, delaunay))
            .on('mouseenter', onMouseEnter)
            .on('mouseleave', onMouseLeave);

        dot = svg.append('g')
            .attr('display', 'none');
        
        dot.append('circle')
            .attr('r', 2.5);
        
        dot.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -8);
        
        svg.attr('width', width)
            .attr('height', height)
            .attr('style', 'max-width: 100%; height: auto; overflow: visible; font: 10px')
    }

    const drawXAxis = (x:d3.ScaleTime<number,number>, width:number, height:number, marginBottom:number) => {
        // x axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    }

    const drawYAxis = (y:d3.ScaleLinear<number,number>, marginLeft:number) => {
        // y axis
        svg.append('g')
            .attr('transform', `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(y));
    }

    const drawLines = (line:d3.Line<Point>) => {
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

    const getContainerWidth = (container:HTMLElement):number => {
        return container.offsetWidth;
    }

    const getContainerHeight = (container:HTMLElement):number => {
        return container.offsetHeight;
    }

    // Events
    const onMouseEnter = () => {
        dot.attr('display', null);
    }

    const onMouseLeave = () => {
        svg.selectAll<SVGPathElement, Point[]>('.data-line')
            .style('opacity', 1);
        
        dot.attr('display', 'none');
    }

    const onMouseMove = (event: MouseEvent, x:d3.ScaleTime<number, number>, y:d3.ScaleLinear<number, number>, delaunay:d3.Delaunay<number>) => {
        const [xm, ym] = d3.pointer(event);

        const index = delaunay.find(xm, ym);

        const selectedPoint = groupedPointsFlat[index];

        // pixel x and y value for nearest point
        const px = x(selectedPoint.boundary); 
        const py = y(selectedPoint.value);

        // distance of cursor to px py
        const dx = px - xm;
        const dy = py - ym;
        const radiusSq = 200 * 200;

        // if in radius then show label etc
        if (dx*dx + dy*dy <= radiusSq) {
            svg.selectAll<SVGPathElement, Point[]>('.data-line')
            // can use [0] here to get the label as all points on a line have the same label
            .style('opacity', d => d[0].label === selectedPoint.label ? '1' : '0.1')
            .filter(d => d[0].label === selectedPoint.label)
            .raise();

            const friendlyDate = formatDate(selectedPoint.boundary);

            meta = {
                group: groupsMap.get(selectedPoint.groupId) as Group,
                time: friendlyDate,
                component: selectedPoint.component,
                value: selectedPoint.value
            }

            dot.transition()
                .duration(10)
                .ease(d3.easeLinear)
                .attr('transform', `translate(${x(selectedPoint.boundary)}, ${y(selectedPoint.value)})`);

            dot.select('text').text(`${selectedPoint.label} [${friendlyDate}, ${selectedPoint.value}]`);
        }
    }

    const filterChart = () => {
        const timeFilter:Date[] = $state.snapshot(timeFilterValue);
        const timeFilterActive = timeFilter.length === 2;
        let filteredPoints:Point[] = points;

        if (timeFilterActive) {
                filteredPoints = points.filter(
                (p) => p.boundary >= timeFilter[0] && p.boundary <= timeFilter[1]
            );
        }

        groupedPoints =  d3.rollup(timeFilterActive ? filteredPoints : points, value => value, d => d.label);
        groupedPoints = filteredGroupedPoints(groupedPoints);
        groupedPointsFlat = flattenGroupedPoints(groupedPoints);
        redrawChart();
    }

</script>

<div id="chart-container" class="h-[70%]">
    <!-- <Button onClick={handleClick} label="Filter test"></Button> -->
    <svg id="line-chart"></svg>
</div>
<hr />
<div class="chart-helpers p-(--space-md) flex">
    <div class="filters w-1/2 pr-(--space-md) border-r-(--border)">
        <ChartFilters onFilterChange={filterChart}></ChartFilters>
    </div>
    <div class="meta w-1/2 pl-(--space-md)">
        <h3 class="mb-(--space-sm)">Meta</h3>
        <div class="flex gap-5">
            <div class="flex-1">
                <p><span>Date/Time:</span> {meta?.time}</p>
                <p><span>Value:</span> {meta?.value}</p>
                <p><span>Description:</span> {meta?.group.description}</p>
                <p><span>Kind:</span> {meta?.group.kind}</p>
                <p><span>Component:</span> {meta?.component}</p>
            </div>
            <div class="flex-1">
                <p><span>CPU:</span> 20 CPU cores</p>
                <p><span>Memory:</span> 64GB</p>
                <p><span>Total amount of Data Points:</span>{groupedPointsFlat.length}</p>
            </div>
        </div>
    </div>
</div>