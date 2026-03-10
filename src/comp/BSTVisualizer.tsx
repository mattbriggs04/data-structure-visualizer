import "./BSTVisualizer.css";
import { BST } from "../data_structures/tree";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVerticalLine } from "@visx/shape";
import useOperationAnimation from "./useOperationAnimation";

interface BSTVisualizerProps {
    bst: BST<number>;
}

function BSTVisualizer({bst} : BSTVisualizerProps) {
    const width = 1200;
    const height = 800;
    const margin = { top: 30, left: 0 };
    const treeObj = bst.toObject();
    const { activeNodeIds, focusNodeId } = useOperationAnimation(bst.lastOperation);

    const operationCopy = bst.lastOperation === null
        ? 'Insert or delete a value to animate the search path.'
        : `${bst.lastOperation.type === 'insert' ? 'Inserting' : 'Deleting'} ${bst.lastOperation.value}`;

    return (
        <div className="bst-container">
            <h2>Binary Search Tree</h2>
            <p className="visualizer-copy">{operationCopy}</p>
            <svg className={`bst-svg`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                treeObj !== null &&
                <Group top={margin.top} left={margin.left}>
                    <Tree
                        root={hierarchy(treeObj)}
                        size={[width, height - 100]}
                    >
                        {(tree) => {
                            const widthGap = 250;
                            const minGap = 20;
                            const heightGap = 75;

                            tree.descendants().forEach((node) => {
                                if(node.parent !== null) {
                                    let gap = widthGap - node.depth * 50;
                                    if(gap < minGap) {
                                        gap = minGap;
                                    }

                                    node.x = node.parent.x + (node.data.value <= node.parent.data.value ? -gap : gap);
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
                                                className={`bst-link ${isActive ? 'bst-link-active' : ''}`}
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
                                            'bst-node',
                                            isVisited ? 'bst-node-active' : '',
                                            isFocused ? `bst-node-${bst.lastOperation?.type}` : '',
                                        ].join(' ').trim();

                                        return (
                                            <Group
                                                key={node.data.id}
                                                top={node.y}
                                                left={node.x}
                                                className="bst-node-group"
                                                style={{ animationDelay: `${idx * 40}ms` }}
                                            >
                                                <circle className={nodeClass} />
                                                <text className={`bst-node-text`}>
                                                    {node.data.value}
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
                        Insert a value to build the tree.
                    </text>
                }
            </svg>
        </div>
    )
}

export default BSTVisualizer;
