import "./StackVisualizer.css";
import { Stack } from "../data_structures/stack";
import { Group } from "@visx/group";

interface StackVisualizerProps<T> {
    stack: Stack<T>;
}

function StackVisualizer({stack} : StackVisualizerProps<number>) {
    const width = 500;
    const height = 800;
    const node_width = 50;
    const node_height = node_width;
    const top_margin = 30;
    const bottom_margin = 150; // so the stack starts from the bottom of the svg
    const center_x = (width - node_width) / 2

    const stackArr = stack.getArr();
    console.log(stackArr);
    return (
        <div className={`stack-container`}>
            <h2>Stack</h2>
            <svg className={`stack-svg`} width={width} height={height}>
                {
                    stackArr !== null && 
                    <Group top={0} left={0}>
                        {stackArr.map((element, i) => (
                            <Group key={i}>
                                <rect className={`stack-node`} x={center_x} y={height - (i * node_height + bottom_margin)} width={node_width} height={node_height} />
                                <text className={`stack-node-text`} x={center_x + node_width / 2} y={height - (i * node_height + bottom_margin) + node_height / 2} >{element}</text>
                            </Group>
                        ))}
                    </Group>
                }
            </svg>
        </div>
    );
}

export default StackVisualizer;