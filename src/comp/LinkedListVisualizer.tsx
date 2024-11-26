import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './LinkedListVisualizer.css'

interface LinkedListVisualizerProps {
    linkedList: number[];
}
function LinkedListVisualizer({linkedList} : LinkedListVisualizerProps) {
    const svgRef = useRef<HTMLDivElement | null>(null);
    const d3svg = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);

    useEffect(() => {
        if(svgRef.current) { // Ensure that the component rendered correctly
            const svgWidth = 500;
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
            const nodeHeight: number = 50;
            const spacing: number = 20; // spacing between each node

            const svg = d3svg.current;

            svg.selectAll("*").remove();

            linkedList.forEach((val, idx) => {
                const x = idx * (nodeWidth + spacing);
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
                
                svg.append("arrow")
                    .attr("x1", x - spacing)
                    .attr("y1", y + nodeHeight / 2)
                    .attr("x2", x)
                    .attr("y2", y + nodeHeight / 2)
                    .attr("class", "link")
            });
        }
    }, [linkedList]);

    
    return (
        <div className={`linkedlist-container`}>
            <h2>Linked List Selected</h2>
            <div ref={svgRef}></div>
        </div>
    );
}

export default LinkedListVisualizer;