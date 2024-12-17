import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './LinkedListVisualizer.css';

interface LinkedListVisualizerProps {
    linkedList: number[];
}
function LinkedListVisualizer({linkedList} : LinkedListVisualizerProps) {
    const svgRef = useRef<HTMLDivElement | null>(null);
    const d3svg = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);

    useEffect(() => {
        if(svgRef.current) { // Ensure that the component rendered correctly
            const svgWidth = 1000;
            const svgHeight = 200;
            d3svg.current = d3.select(svgRef.current) // create svg
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("class", "linkedlist-svg");
        }
    }, []);

    useEffect(() => {
        if(d3svg.current) {
            const nodeWidth: number = 50;
            const nodeHeight: number = 50; // ideally around svgHeight / 4
            const spacing: number = 30; // spacing between each node

            const svg = d3svg.current;

            svg.selectAll("*").remove();

            // <defs> section for markers
            svg.append("defs")
                .append("marker")
                .attr("id", "arrowhead")
                .attr("refX", 6) // offset width of triangle as defined in "d" attribute
                .attr("refY", 3) // offset height of triangle as defined in "d" attribute
                .attr("markerWidth", 15)
                .attr("markerHeight", 15)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0 0 6 3 0 6 Z"); // triangle

            svg.append("defs")
                .append("marker")
                .attr("id", "ground")
                .attr("refX", 5.5)
                .attr("refY", 0)
                .attr("markerWidth", 30)
                .attr("markerHeight", 30)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 5 0 L 5 7 M 0 7 L 10 7 M 2 9 L 8 9 M 4 11 L 6 11"); // ground symbol 
            
            linkedList.forEach((val, idx) => {
                // + 1 removes the left border of the first node from going into the padding
                const x = idx * (nodeWidth + spacing) + 1; 
                const y = nodeHeight;

                svg.append("rect")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("width", nodeWidth)
                    .attr("height", nodeHeight)
                    .attr("class", "node")
                
                svg.append("text")
                    .attr("x", x + nodeWidth / 2)
                    .attr("y", y + nodeHeight / 2)
                    .attr("fill", "white")
                    .attr("class", "node-text")
                    .text(val);

                if(idx > 0) {
                    svg.append("line")
                        .attr("x1", x - spacing)
                        .attr("y1", y + nodeHeight / 2)
                        .attr("x2", x)
                        .attr("y2", y + nodeHeight / 2)
                        .attr("class", "link")
                        .attr("marker-end", "url(#arrowhead)");
                }
            });

            if(linkedList.length > 0) {
                svg.append("line")
                    .attr("x1", linkedList.length * (nodeWidth + spacing) - spacing)
                    .attr("y1", nodeHeight + nodeHeight / 2)
                    .attr("x2", linkedList.length * (nodeWidth + spacing))
                    .attr("y2", nodeHeight + nodeHeight / 2)
                    .attr("class", "link")
                    .attr("marker-end", "url(#ground)");
            }
            
        }
    }, [linkedList]);

    
    // TODO: add radio buttons to select singly linked, doubly linked, circular, etc.
    return (
        <div className={`linkedlist-container`}>
            <h2>Linked List</h2>
            <div ref={svgRef}></div>
        </div>
    );
}

export default LinkedListVisualizer;