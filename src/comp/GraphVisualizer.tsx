import './GraphVisualizer.css';
import { useEffect, useMemo, useState } from 'react';
import { Graph } from '../data_structures/graph';
import useOperationAnimation from './useOperationAnimation';

interface GraphVisualizerProps {
    graph: Graph;
}

function GraphVisualizer({graph}: GraphVisualizerProps) {
    const width = 1000;
    const height = 620;
    const graphObj = graph.toObject();
    const { activeNodeIds, focusNodeId } = useOperationAnimation(graph.lastOperation);
    const [activeEdgeIds, setActiveEdgeIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        if(graph.lastOperation === null) {
            setActiveEdgeIds(new Set());
            return;
        }

        const operation = graph.lastOperation;
        const timers: number[] = [];
        setActiveEdgeIds(new Set());

        operation.visitedEdgeIds.forEach((edgeId, idx) => {
            timers.push(window.setTimeout(() => {
                setActiveEdgeIds((prev) => {
                    const next = new Set(prev);
                    next.add(edgeId);
                    return next;
                });
            }, (idx + 1) * 320));
        });

        timers.push(window.setTimeout(() => {
            setActiveEdgeIds(new Set());
        }, (Math.max(operation.visitedEdgeIds.length, operation.visitedNodeIds.length) + 1) * 320 + 1400));

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
        };
    }, [graph.lastOperation]);

    const nodePositions = useMemo(() => {
        const positions = new Map<number, { x: number; y: number }>();
        const center = { x: width / 2, y: height / 2 };
        const nodeCount = graphObj.nodes.length;
        const radius = nodeCount <= 1 ? 0 : Math.min(220, 120 + nodeCount * 14);

        graphObj.nodes.forEach((node, idx) => {
            const angle = nodeCount <= 1 ? -Math.PI / 2 : -Math.PI / 2 + idx * (2 * Math.PI / nodeCount);
            positions.set(node.id, {
                x: center.x + radius * Math.cos(angle),
                y: center.y + radius * Math.sin(angle),
            });
        });

        return positions;
    }, [graphObj.nodes]);

    const operationCopy = graph.lastOperation === null
        ? 'Add nodes and edges, then run BFS or DFS from a start node.'
        : graph.lastOperation.label;

    return (
        <div className="graph-container">
            <h2>Graph</h2>
            <p className="visualizer-copy">{operationCopy}</p>
            <svg className="graph-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {graphObj.edges.map((edge) => {
                    const source = nodePositions.get(edge.source);
                    const target = nodePositions.get(edge.target);
                    if(source === undefined || target === undefined) {
                        return null;
                    }

                    return (
                        <line
                            key={edge.id}
                            className={`graph-link ${activeEdgeIds.has(edge.id) ? 'graph-link-active' : ''}`}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                        />
                    );
                })}

                {graphObj.nodes.map((node, idx) => {
                    const position = nodePositions.get(node.id);
                    if(position === undefined) {
                        return null;
                    }

                    const nodeClass = [
                        'graph-node',
                        activeNodeIds.has(node.id) ? 'graph-node-active' : '',
                        focusNodeId === node.id ? 'graph-node-focus' : '',
                    ].join(' ').trim();

                    return (
                        <g
                            key={node.id}
                            className="graph-node-group"
                            transform={`translate(${position.x} ${position.y})`}
                            style={{ animationDelay: `${idx * 70}ms` }}
                        >
                            <circle className={nodeClass} />
                            <text className="graph-node-text">{node.label}</text>
                        </g>
                    );
                })}

                {graphObj.nodes.length === 0 &&
                    <text className="visualizer-empty-text" x={width / 2} y={height / 2}>
                        Add a few named vertices to build a graph.
                    </text>
                }
            </svg>
            {graph.lastTraversal.length > 0 &&
                <p className="graph-traversal-order">Traversal order: {graph.lastTraversal.join(' -> ')}</p>
            }
        </div>
    );
}

export default GraphVisualizer;
