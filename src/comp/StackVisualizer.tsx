import "./StackVisualizer.css";
import { Stack } from "../data_structures/stack";
import { Group } from "@visx/group";

interface StackVisualizerProps<T> {
    stack: Stack<T>;
}

function StackVisualizer({stack} : StackVisualizerProps<number>) {
    const width = 500;
    const height = 600;
    const nodeWidth = 75;
    const nodeHeight = nodeWidth;
    const bottomMargin = 150;
    const centerX = (width - nodeWidth) / 2;
    const stackArr = stack.getArr() ?? [];

    return (
        <div className={`stack-container`}>
            <p className="visualizer-copy">Push grows upward. Pop removes the top-most element first.</p>
            <svg className={`stack-svg`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                    stackArr.length > 0 &&
                    <Group top={0} left={0}>
                        {stackArr.map((element, i) => {
                            const y = height - (i * nodeHeight + bottomMargin);
                            const isTop = i === stackArr.length - 1;
                            const groupClass = `stack-node-group ${isTop ? 'stack-node-group-top' : ''}`;
                            const nodeClass = `stack-node ${isTop ? 'stack-node-top' : ''}`;

                            return (
                                <Group
                                    key={`${stack.version}-${i}-${element}`}
                                    className={groupClass}
                                    style={{ animationDelay: `${(stackArr.length - i - 1) * 60}ms` }}
                                >
                                    <rect className={nodeClass} x={centerX} y={y} width={nodeWidth} height={nodeHeight} />
                                    <text className={`stack-node-text`} x={centerX + nodeWidth / 2} y={y + nodeHeight / 2}>
                                        {element}
                                    </text>
                                </Group>
                            );
                        })}
                    </Group>
                }
                {
                    stackArr.length === 0 &&
                    <text className="visualizer-empty-text" x={width / 2} y={height / 2}>
                        Push a value onto the stack.
                    </text>
                }
            </svg>
        </div>
    );
}

export default StackVisualizer;
