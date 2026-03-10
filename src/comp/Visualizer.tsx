import "./Visualizer.css"
import { DataType, StructureType, structureLabels } from "../types/types"
import LinkedListVisualizer from "./LinkedListVisualizer";
import BSTVisualizer from "./BSTVisualizer";
import StackVisualizer from "./StackVisualizer";
import AVLVisualizer from "./AVLVisualizer";
import HeapVisualizer from "./HeapVisualizer";
import GraphVisualizer from "./GraphVisualizer";

interface VisualizerProps {
    structure: StructureType;
    data: DataType;
    onOpenStructureModal: () => void;
}

const structureDescriptions: Record<Exclude<StructureType, ''>, string> = {
    linkedlist: 'Follow nodes and pointers as the list updates from one end to the other.',
    stack: 'Watch LIFO behavior as values push upward and pop from the top.',
    bst: 'Trace insert and delete paths through a binary search tree.',
    avl: 'See how self-balancing rotations keep the tree efficient.',
    minheap: 'Track how smaller weights bubble toward the root.',
    maxheap: 'Track how larger weights bubble toward the root.',
    graph: 'Build connections and animate traversal order through the graph.',
};

function Visualizer({structure, data, onOpenStructureModal} : VisualizerProps) {
    if(structure === '') {
        return (
            <section className="visualizer-container visualizer-home">
                <div className="visualizer-hero">
                    <p className="visualizer-eyebrow">Welcome</p>
                    <h1>See data structures move.</h1>
                    <p className="visualizer-copy">
                        Pick a structure to explore clean animations, focused controls, and step-by-step behavior without getting buried in implementation details.
                    </p>
                    <button
                        type="button"
                        className="button-style1 visualizer-cta"
                        onClick={onOpenStructureModal}
                    >
                        Get Started
                    </button>
                    <div className="visualizer-pill-row" aria-hidden="true">
                        <span className="visualizer-pill">Interactive controls</span>
                        <span className="visualizer-pill">Animated operations</span>
                        <span className="visualizer-pill">Clean explanations</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="visualizer-container">
            <div className="visualizer-header">
                <p className="visualizer-eyebrow">Now Visualizing</p>
                <h1>{structureLabels[structure]}</h1>
                <p className="visualizer-copy">{structureDescriptions[structure]}</p>
            </div>
            {
                structure === "linkedlist" && <LinkedListVisualizer linkedList={data["linkedlist"]} />
            }
            {
                structure === "bst" && <BSTVisualizer bst={data["bst"]} />
            }
            {
                structure === "stack" && <StackVisualizer stack={data["stack"]} />
            }
            {
                structure === "avl" && <AVLVisualizer avl={data["avl"]} />
            }
            {
                structure === "minheap" && <HeapVisualizer heap={data["minheap"]} />
            }
            {
                structure === "maxheap" && <HeapVisualizer heap={data["maxheap"]} />
            }
            {
                structure === "graph" && <GraphVisualizer graph={data["graph"]} />
            }
        </section>
    );
}

export default Visualizer;
