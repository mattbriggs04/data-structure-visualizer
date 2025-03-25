import './HeapVisualizer.css';
import { Heap } from '../data_structures/tree';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinkVerticalLine } from '@visx/shape';

interface HeapVisualizerProps {
    heap: Heap;
}
function HeapVisualizer({heap} : HeapVisualizerProps) {
    const width = 1000;
    const height = 800;
    let origin = { x: 0, y: 0 };
    let margin = { top: 40, left: 0, right: 0, bottom: 0 };

    let treeObj = heap.toObject();
    console.log(heap.arr);
    return (
        <div className="heap-container">
            <h2>{heap.type == "min" ? "Min" : "Max"} Heap</h2>
            {/* <h2>{heap.getArr()}</h2> */}
            <svg className={`heap-svg`} width={width} height={height}>
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
                        const width_gap = 245;
                        const min_gap = 20;
                        const height_gap = 95;
                        tree.descendants().forEach((node) => {
                            if(node.parent !== null) {
                                // use the depth to dynamically shrink the x value width so the nodes won't overlap
                                let gap = width_gap - node.depth * 60;
                                if (gap < min_gap) {
                                    gap = min_gap
                                }
                                node.x = node.parent.x + (node.data.isLeft ? -gap  : gap);
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
                                        <circle className={`heap-node`} />
                                        <text className={`heap-node-text`}>
                                            {node.data.txt},{node.data.value} 
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

export default HeapVisualizer;