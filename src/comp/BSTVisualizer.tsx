import { useEffect, useRef } from "react";
import * as d3 from "d3"
import "./BSTVisualizer.css";
import { BST } from "../data_structures/tree";

interface BSTVisualizerProps {
    bst: BST;
}

function BSTVisualizer({bst} : BSTVisualizerProps) {
    const svgRef = useRef<HTMLDivElement | null>(null);
    const d3svg = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);

    // Create svg itself when component mounts
    useEffect(() => {
        if(svgRef.current) { // Ensure that the component rendered correctly
            const svgWidth = 1000;
            const svgHeight = 200;
            d3svg.current = d3.select(svgRef.current) // create svg
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("class", "bst-svg");
        }
    }, []);

    useEffect(() => {
        console.log("bst received")
    }, [bst]);

    return (
        <div className="bst-container">
            <div ref={svgRef}></div>
        </div>
    )
}

export default BSTVisualizer;