import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './LinkedListVisualizer.css';

interface LinkedListVisualizerProps<T> {
    linkedList: T[];
}

interface LinkedListNodeDatum {
    id: string;
    value: number;
    x: number;
    y: number;
}

interface LinkedListLinkDatum {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    markerEnd: string;
}

function LinkedListVisualizer({linkedList} : LinkedListVisualizerProps<number>) {
    const svgRef = useRef<HTMLDivElement | null>(null);
    const d3svg = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
    const svgWidth = 800;
    const svgHeight = 200;
    const leftPadding = 20;

    const ensureMarkers = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
        if(!svg.select('defs').empty()) {
            return;
        }

        const defs = svg.append('defs');

        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("refX", 6)
            .attr("refY", 3)
            .attr("markerWidth", 15)
            .attr("markerHeight", 15)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 6 3 0 6 Z");

        defs.append("marker")
            .attr("id", "ground")
            .attr("refX", 5.5)
            .attr("refY", 0)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 5 0 L 5 7 M 0 7 L 10 7 M 2 9 L 8 9 M 4 11 L 6 11");
    }

    useEffect(() => {
        if(svgRef.current === null || d3svg.current !== null) {
            return;
        }

        d3svg.current = d3.select(svgRef.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "linkedlist-svg");

        ensureMarkers(d3svg.current);
    }, []);

    useEffect(() => {
        if(d3svg.current === null) {
            return;
        }

        const nodeWidth = 50;
        const nodeHeight = 50;
        const spacing = 40;
        const svg = d3svg.current;
        ensureMarkers(svg);

        const nodes: LinkedListNodeDatum[] = linkedList.map((value, idx) => ({
            id: `${idx}-${value}`,
            value,
            x: leftPadding + idx * (nodeWidth + spacing),
            y: svgHeight / 2 - nodeHeight / 2,
        }));

        const links: LinkedListLinkDatum[] = [];
        for(let idx = 1; idx < nodes.length; idx++) {
            links.push({
                id: `link-${nodes[idx].id}`,
                x1: nodes[idx].x - spacing,
                y1: nodes[idx].y + nodeHeight / 2,
                x2: nodes[idx].x,
                y2: nodes[idx].y + nodeHeight / 2,
                markerEnd: 'url(#arrowhead)',
            });
        }

        if(nodes.length > 0) {
            const tail = nodes[nodes.length - 1];
            links.push({
                id: 'tail-null',
                x1: tail.x + nodeWidth,
                y1: tail.y + nodeHeight / 2,
                x2: tail.x + nodeWidth + spacing,
                y2: tail.y + nodeHeight / 2,
                markerEnd: 'url(#ground)',
            });
        }

        const linkSelection = svg.selectAll<SVGLineElement, LinkedListLinkDatum>('line.link')
            .data<LinkedListLinkDatum>(links, (d) => d.id);

        linkSelection.exit()
            .transition()
            .duration(250)
            .style('opacity', 0)
            .remove();

        const linkEnter = linkSelection.enter()
            .append('line')
            .attr('class', 'link')
            .attr('x1', (d) => d.x1)
            .attr('y1', (d) => d.y1)
            .attr('x2', (d) => d.x1)
            .attr('y2', (d) => d.y1)
            .style('opacity', 0);

        linkEnter.merge(linkSelection)
            .attr('marker-end', (d) => d.markerEnd)
            .transition()
            .duration(450)
            .attr('x1', (d) => d.x1)
            .attr('y1', (d) => d.y1)
            .attr('x2', (d) => d.x2)
            .attr('y2', (d) => d.y2)
            .style('opacity', 1);

        const nodeSelection = svg.selectAll<SVGGElement, LinkedListNodeDatum>('g.linkedlist-node-group')
            .data<LinkedListNodeDatum>(nodes, (d) => d.id);

        const exitingNodes = nodeSelection.exit() as d3.Selection<SVGGElement, LinkedListNodeDatum, SVGSVGElement, unknown>;
        exitingNodes
            .transition()
            .duration(250)
            .style('opacity', 0)
            .attr('transform', (d) => `translate(${d.x}, ${d.y + 20})`)
            .remove();

        const nodeEnter = nodeSelection.enter()
            .append('g')
            .attr('class', 'linkedlist-node-group')
            .attr('transform', (d) => `translate(${d.x - 25}, ${d.y})`)
            .style('opacity', 0);

        nodeEnter.append('rect')
            .attr('class', 'node')
            .attr('width', nodeWidth)
            .attr('height', nodeHeight);

        nodeEnter.append('text')
            .attr('class', 'node-text')
            .attr('x', nodeWidth / 2)
            .attr('y', nodeHeight / 2);

        nodeEnter.merge(nodeSelection)
            .transition()
            .duration(450)
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
            .style('opacity', 1);

        nodeEnter.merge(nodeSelection).select<SVGTextElement>('text')
            .text((d) => String(d.value));
    }, [linkedList]);

    return (
        <div className={`linkedlist-container`}>
            <p className="visualizer-copy">Each box stores a value and a pointer to the next node in the list.</p>
            <div ref={svgRef} className={`linkedlist-svg`}></div>
        </div>
    );
}

export default LinkedListVisualizer;
