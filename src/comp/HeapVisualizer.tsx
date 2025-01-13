import './HeapVisualizer.css';
import { Heap } from '../data_structures/tree'

interface HeapVisualizerProps {
    type: string;
    heap: Heap;
}
function HeapVisualizer({type, heap} : HeapVisualizerProps) {
    const width = 1000;
    const height = 800;
    let origin = { x: 0, y: 0 };
    let margin = { top: 30, left: 0, right: 0, bottom: 0 };

    let heapObj = heap.toObject();
    return(
        <div className={`heap-container`}>
            
        </div>
    )
}

export default HeapVisualizer;