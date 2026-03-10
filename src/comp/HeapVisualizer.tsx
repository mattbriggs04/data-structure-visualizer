import './HeapVisualizer.css';
import { Heap } from '../data_structures/tree';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinkVerticalLine } from '@visx/shape';
import useOperationAnimation from './useOperationAnimation';

interface HeapVisualizerProps {
    heap: Heap;
}

function HeapVisualizer({heap} : HeapVisualizerProps) {
    const width = 1000;
    const height = 800;
    const margin = { top: 40, left: 0 };
    const treeObj = heap.toObject();
    const { activeNodeIds, focusNodeId } = useOperationAnimation(heap.lastOperation);

    const operationCopy = heap.lastOperation === null
        ? 'Insert an item with an id and weight to animate the heap property.'
        : `${heap.lastOperation.type === 'insert' ? 'Inserted' : 'Extracted'} ${heap.lastOperation.label}`;

    return (
        <div className="heap-container">
            <h2>{heap.type === "min" ? "Min" : "Max"} Heap</h2>
            <p className="visualizer-copy">{operationCopy}</p>
            <svg className={`heap-svg`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                treeObj !== null &&
                <Group top={margin.top} left={margin.left}>
                    <Tree
                        root={hierarchy(treeObj)}
                        size={[width, height - 100]}
                    >
                        {(tree) => {
                            const widthGap = 245;
                            const minGap = 20;
                            const heightGap = 95;

                            tree.descendants().forEach((node) => {
                                if(node.parent !== null) {
                                    let gap = widthGap - node.depth * 60;
                                    if(gap < minGap) {
                                        gap = minGap;
                                    }

                                    node.x = node.parent.x + (node.data.isLeft ? -gap : gap);
                                    node.y = node.parent.y + heightGap;
                                }
                            });

                            return (
                                <Group>
                                    {tree.links().map((link) => {
                                        const isActive = activeNodeIds.has(link.target.data.id) || focusNodeId === link.target.data.id;
                                        return (
                                            <LinkVerticalLine
                                                key={link.target.data.id}
                                                className={`heap-link ${isActive ? 'heap-link-active' : ''}`}
                                                data={link}
                                                strokeWidth={isActive ? "2.5" : "1"}
                                                fill="none"
                                            />
                                        );
                                    })}

                                    {tree.descendants().map((node, idx) => {
                                        const isVisited = activeNodeIds.has(node.data.id);
                                        const isFocused = focusNodeId === node.data.id;
                                        const nodeClass = [
                                            'heap-node',
                                            isVisited ? 'heap-node-active' : '',
                                            isFocused ? `heap-node-${heap.lastOperation?.type}` : '',
                                        ].join(' ').trim();

                                        return (
                                            <Group
                                                key={node.data.id}
                                                top={node.y}
                                                left={node.x}
                                                className="heap-node-group"
                                                style={{ animationDelay: `${idx * 40}ms` }}
                                            >
                                                <circle className={nodeClass} />
                                                <text className={`heap-node-text`}>
                                                    {node.data.txt},{node.data.value}
                                                </text>
                                            </Group>
                                        );
                                    })}
                                </Group>
                            );
                        }}
                    </Tree>
                </Group>
                }
                {
                    treeObj === null &&
                    <text className="visualizer-empty-text" x={width / 2} y={height / 2}>
                        Insert a labeled item to build the heap.
                    </text>
                }
            </svg>
        </div>
    );
}

export default HeapVisualizer;
