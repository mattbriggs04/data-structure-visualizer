
import LinkedListVisualizer from "./LinkedListVisualizer";
import "./Visualizer.css"

interface Data {
    [key: string]: number[]; // TODO: change this eventually -> currently not sure what types may be needed
}
interface VisualizerProps {
    structure: string;
    data: Data;
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
        </div>
    );
}

export default Visualizer;