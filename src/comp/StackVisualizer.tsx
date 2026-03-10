import { useEffect, useRef, useState } from "react";
import "./StackVisualizer.css";
import { Stack } from "../data_structures/stack";
import { Group } from "@visx/group";

interface StackVisualizerProps<T> {
    stack: Stack<T>;
}

interface TransientStackNode {
    key: string;
    value: number;
    y: number;
}

function StackVisualizer({stack} : StackVisualizerProps<number>) {
    const width = 500;
    const height = 600;
    const nodeWidth = 75;
    const nodeHeight = nodeWidth;
    const bottomMargin = 150;
    const centerX = (width - nodeWidth) / 2;
    const stackArr = stack.getArr() ?? [];
    const stackSnapshot = stackArr.slice();
    const [enteringKey, setEnteringKey] = useState<string | null>(null);
    const [exitingNode, setExitingNode] = useState<TransientStackNode | null>(null);
    const previousStackRef = useRef<number[]>(stackSnapshot);

    const buildNodeKey = (value: number, index: number) => `${index}-${value}`;
    const getNodeY = (index: number) => height - (index * nodeHeight + bottomMargin);

    useEffect(() => {
        const currentStack = (stack.getArr() ?? []).slice();
        const previousStack = previousStackRef.current;
        let timerId: number | null = null;

        if(stack.lastOperation === 'push' && currentStack.length === previousStack.length + 1) {
            const newIndex = currentStack.length - 1;
            setEnteringKey(buildNodeKey(currentStack[newIndex], newIndex));
            setExitingNode(null);
            timerId = window.setTimeout(() => {
                setEnteringKey(null);
            }, 340);
        }
        else if(stack.lastOperation === 'pop' && previousStack.length === currentStack.length + 1) {
            const removedIndex = previousStack.length - 1;
            setEnteringKey(null);
            setExitingNode({
                key: `${buildNodeKey(previousStack[removedIndex], removedIndex)}-${stack.version}`,
                value: previousStack[removedIndex],
                y: height - (removedIndex * nodeHeight + bottomMargin),
            });
            timerId = window.setTimeout(() => {
                setExitingNode(null);
            }, 260);
        }
        else {
            setEnteringKey(null);
            setExitingNode(null);
        }

        previousStackRef.current = currentStack;

        return () => {
            if(timerId !== null) {
                window.clearTimeout(timerId);
            }
        };
    }, [bottomMargin, height, nodeHeight, stack, stack.lastOperation, stack.version]);

    return (
        <div className={`stack-container`}>
            <p className="visualizer-copy">Push grows upward. Pop removes the top-most element first.</p>
            <svg className={`stack-svg`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                    stackSnapshot.length > 0 &&
                    <Group top={0} left={0}>
                        {stackSnapshot.map((element, i) => {
                            const y = getNodeY(i);
                            const isTop = i === stackSnapshot.length - 1;
                            const isEntering = enteringKey === buildNodeKey(element, i);
                            const groupClass = `stack-node-group ${isEntering ? 'stack-node-group-enter' : ''}`;
                            const nodeClass = `stack-node ${isTop ? 'stack-node-top' : ''}`;

                            return (
                                <Group
                                    key={buildNodeKey(element, i)}
                                    className={groupClass}
                                >
                                    <rect className={nodeClass} x={centerX} y={y} width={nodeWidth} height={nodeHeight} />
                                    <text className={`stack-node-text`} x={centerX + nodeWidth / 2} y={y + nodeHeight / 2}>
                                        {element}
                                    </text>
                                </Group>
                            );
                        })}
                        {
                            exitingNode !== null &&
                            <Group key={exitingNode.key} className="stack-node-group stack-node-group-exit">
                                <rect
                                    className="stack-node stack-node-top"
                                    x={centerX}
                                    y={exitingNode.y}
                                    width={nodeWidth}
                                    height={nodeHeight}
                                />
                                <text
                                    className="stack-node-text"
                                    x={centerX + nodeWidth / 2}
                                    y={exitingNode.y + nodeHeight / 2}
                                >
                                    {exitingNode.value}
                                </text>
                            </Group>
                        }
                    </Group>
                }
                {
                    stackSnapshot.length === 0 &&
                    <text className="visualizer-empty-text" x={width / 2} y={height / 2}>
                        Push a value onto the stack.
                    </text>
                }
            </svg>
        </div>
    );
}

export default StackVisualizer;
