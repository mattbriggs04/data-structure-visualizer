import "./BSTVisualizer.css";
import { BST } from "../data_structures/tree";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVerticalLine } from "@visx/shape";
interface BSTVisualizerProps {
    bst: BST<number>;
}

function BSTVisualizer({bst} : BSTVisualizerProps) {
    const width = 800;
    const height = 500;
    let origin = { x: 0, y: 0 };
    let margin = { top: 30, left: 0, right: 0, bottom: 0 };

    let treeObj = bst.toObject();
    return (
        <div className="bst-container">
            <h2>Binary Search Tree</h2>
            <svg className={`bst-svg`} width={width} height={height}>
                {
                treeObj !== null &&
                <Group top={margin.top} left={margin.left}>
                    {/* Create the tree using the tree object -> must have children attribute */}
                    <Tree 
                        root={hierarchy(treeObj)}
                        size={[width, height - 100]} // Create 100px offset from height to account for circles needing to fit in svg
                        separation={(a, b) => (a.parent === b.parent ? 1 : 1)}
                    >
                        {(tree) => (
                            <Group top={origin.x} left={origin.y}>
                                {/* Create the lines/links between all tree elements */}
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
                                    node.data && (
                                    <Group
                                        key={i}
                                        top={node.y}
                                        left={node.x}
                                    >
                                        <circle className="node" />
                                        <text className="node-text">
                                            {node.data.value}
                                        </text>
                                    </Group>)
                                ))}
                            </Group>
                        )}
                    </Tree>
                </Group>
                } 
            </svg>
        </div>
    )
}

export default BSTVisualizer;