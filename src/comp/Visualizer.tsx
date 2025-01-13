import "./Visualizer.css"
import { DataType } from "../types/types"
import LinkedListVisualizer from "./LinkedListVisualizer";
import BSTVisualizer from "./BSTVisualizer";
import StackVisualizer from "./StackVisualizer";
import AVLVisualizer from "./AVLVisualizer";
import HeapVisualizer from "./HeapVisualizer";

interface VisualizerProps<T> {
    structure: string;
    data: DataType<T>;
}
function Visualizer({structure, data} : VisualizerProps<number>) {
    return (
        <div className={`visualizer-container`}>
            <div className={`visualizer-header`}>
                <h1>Data Structure Visualizer</h1>
                {!structure && <h2>No Structure Selected</h2>}
            </div>
            {
                structure == "linkedlist" && <LinkedListVisualizer linkedList={data["linkedlist"]} />
            }
            {
                structure == "bst" && <BSTVisualizer bst={data["bst"]} />
            }
            {
                structure == "stack" && <StackVisualizer stack={data["stack"]} />
            }
            {
                structure == "avl" && <AVLVisualizer avl={data["avl"]} />
            }
            {
                structure == "minheap" && <HeapVisualizer heap={data["minheap"]} />
            }
            {
                structure == "maxheap" && <HeapVisualizer heap={data["maxheap"]} />
            }
        </div>
    );
}

export default Visualizer;