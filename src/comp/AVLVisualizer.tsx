import "./AVLVisualizer.css"
import { AVL } from "../data_structures/tree"
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVerticalLine } from "@visx/shape";

interface AVLVisualizerProps {
    avl: AVL<number>;
}

function AVLVisualizer({avl}: AVLVisualizerProps) {
        const width = 1000;
        const height = 800;
        let origin = { x: 0, y: 0 };
        let margin = { top: 30, left: 0, right: 0, bottom: 0 };
    
        let treeObj = avl.toObject();
        console.log(treeObj);
        return (
            <div className="avl-container">
                <h2>AVL Tree</h2>
                <svg className={`avl-svg`} width={width} height={height}>
                    {
                    treeObj !== null &&
                    <Group top={margin.top} left={margin.left}>
                        {/* Create the tree using the tree object */}
                        <Tree 
                            root={hierarchy(treeObj)}
                            size={[width, height - 100]} // Create 100px offset from height to account for circles needing to fit in svg
                        >
                            {
                            (tree) => {
                            // Create the gaps between nodes for the tree relative to their parent
                            const width_gap = 75;
                            const height_gap = 75;
                            tree.descendants().forEach((node) => {
                                if(node.parent && node.parent.value) {
                                    node.x = node.parent.x + (node.data.value <= node.parent.value ? -width_gap : width_gap);
                                    node.y = node.parent.y + height_gap;
                                }
                            })
    
                            // Render the tree links and nodes themselves
                            return (
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
                                        <Group key={i} top={node.y} left={node.x}>
                                            <circle className={`avl-node`} />
                                            <text className={`avl-node-text`}>
                                                {node.data.value}
                                            </text>
                                            <text className={`avl-node-height-text`}>
                                                {node.data.balance}
                                            </text>
                                        </Group>
                                        )
                                    ))}
                                </Group>
                            )}
                            }
                        </Tree>
                    </Group>
                    } 
                </svg>
            </div>
    );
}

export default AVLVisualizer;