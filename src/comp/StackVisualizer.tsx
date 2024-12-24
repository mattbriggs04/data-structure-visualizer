import "./StackVisualizer.css";
import { Stack } from "../data_structures/stack";
import { Group } from "@visx/group";

interface StackVisualizerProps<T> {
    stack: Stack<T>;
}

function StackVisualizer({stack} : StackVisualizerProps<number>) {
    const width = 500;
    const height = 800;
    return (
        <div className={`stack-container`}>
            <h2>Stack</h2>
            <svg className={`stack-svg`} width={width} height={height}>
                {
                    <Group top={0} left={0}>
                        <rect width={100} height={100} fill="white" />
                        <text className={`node-text`}>hi</text>
                    </Group>
                }
            </svg>
        </div>
    );
}

export default StackVisualizer;