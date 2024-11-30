import LinkedListVisualizer from "./LinkedListVisualizer";
import BSTVisualizer from "./BSTVisualizer";
import "./Visualizer.css"
import { DataType } from "../types/types"

interface VisualizerProps {
    structure: string;
    data: DataType;
}
function Visualizer({structure, data} : VisualizerProps) {
    return (
        <div className={`visualizer-container`}>
            <div className={`visualizer-header`}>
                <h1>Data Structure Visualizer</h1>
            </div>
            {
                structure == "linkedlist" && <LinkedListVisualizer linkedList={data["linkedlist"]} />
            }
            {
                structure == "bst" && <BSTVisualizer bst={data["bst"]} />
            }
        </div>
    );
}

export default Visualizer;