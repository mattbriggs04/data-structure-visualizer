import { useEffect, useRef } from 'react';
import * as d3 from "d3";
import './LinkedListVisualizer.css'

interface LinkedListVisualizerProps {
    linkedList: number[];
}
function LinkedListVisualizer({linkedList} : LinkedListVisualizerProps) {
    const svgRef = useRef(null);
    
    useEffect(() => {
        if(svgRef.current) { // Ensure that the component rendered correctly
            const svgWidth = 500;
            const svgHeight = 200;
            const svg = d3.select(svgRef.current) // create svg
                .append('svg')
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("class", "linkedlist-svg");

            const nodeWidth: number = 50;
            const nodeHeight: number = 50;
            const spacing: number = 20; // spacing between each node

            linkedList.forEach((val, idx) => {
                const x = idx * (nodeWidth + spacing);
                const y = nodeHeight;

                svg.append("rect")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("width", nodeWidth)
                    .attr("height", nodeHeight)
                    .style("fill", "green")
                
                svg.append("text")
                    .attr("x", x + nodeWidth / 2)
                    .attr("y", y + nodeHeight / 2)
                    .attr("fill", "white")
                    .text(val);
            });
        }
    }, []);
    // contains rener logic for linked list
    return (
        <div className={`linkedlist-container`}>
            <h2>Linked List Selected</h2>
            <div ref={svgRef}></div>
        </div>
    );
}

export default LinkedListVisualizer;