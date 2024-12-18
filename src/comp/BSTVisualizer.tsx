import "./BSTVisualizer.css";
import { BST } from "../data_structures/tree";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVerticalLine } from "@visx/shape";
interface BSTVisualizerProps {
    bst: BST;
}
interface Node {
    value: number;
    children?: Node[]
}

const testTree: Node = {
    value: 0,
    children: [
        { // left child
            value: 1,
            children: [
                {
                    value: 3,
                },
                {
                    value: 4,
                }
            ]
        },
        { // right child
            value: 2,
            children: [
                {
                    value: 5,
                },
                {
                    value: 6,
                }
            ]
        }
    ]
}
function BSTVisualizer({bst} : BSTVisualizerProps) {
    const width = 800;
    const height = 500;
    let origin = { x: 0, y: 0 }
    let margin = { top: 30, left: 0, right: 0, bottom: 0 }
    return (
        <div className="bst-container">
            <svg className={`bst-svg`} width={width} height={height}>
                <Group top={margin.top} left={margin.left}>
                    {/* Create the tree using the tree object -> must have children attribute */}
                    <Tree 
                        root={hierarchy(testTree)}
                        size={[width, height - 100]} // Create 100px offset from height to account for circles needing to fit in svg
                        separation={(a, b) => (a.parent === b.parent ? 1 : 1)}
                    >
                        {(tree) => (
                            <Group top={origin.x} left={origin.y}>
                                {/* Create the lines between all tree elements */}
                                {tree.links().map((link, i) => (
                                    <LinkVerticalLine
                                        key={i}
                                        data={link}
                                        stroke="rgb(255,255,255)"
                                        strokeWidth="1"
                                        fill="none" 
                                    />
                                ))}

                                {/* Create the nodes */}
                                {tree.descendants().map((node, i) => (
                                    <Group
                                        key={i}
                                        top={node.y}
                                        left={node.x}
                                    >
                                        <circle className="node" />
                                        <text className="node-text">
                                            {node.data.value}
                                        </text>
                                    </Group>
                                ))}
                            </Group>
                        )}
                    </Tree>
                </Group>
            </svg>
        </div>
    )
}

export default BSTVisualizer;