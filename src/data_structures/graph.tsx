import { Queue } from './queue';

export interface GraphNodeObj {
    id: number;
    label: string;
}

export interface GraphEdgeObj {
    id: number;
    source: number;
    target: number;
}

export interface GraphSnapshot {
    nodes: GraphNodeObj[];
    edges: GraphEdgeObj[];
}

export interface GraphOperation {
    sequence: number;
    type: 'add-node' | 'add-edge' | 'bfs' | 'dfs' | 'example';
    label: string;
    visitedNodeIds: number[];
    visitedEdgeIds: number[];
    focusNodeId: number | null;
}

class GraphNode {
    id: number;
    label: string;

    constructor(id: number, label: string) {
        this.id = id;
        this.label = label;
    }
}

class GraphEdge {
    id: number;
    source: number;
    target: number;

    constructor(id: number, source: number, target: number) {
        this.id = id;
        this.source = source;
        this.target = target;
    }
}

export class Graph {
    nodes: GraphNode[];
    edges: GraphEdge[];
    adjacency: Map<number, Set<number>>;
    lastOperation: GraphOperation | null;
    lastTraversal: string[];
    private nextNodeId: number;
    private nextEdgeId: number;
    private operationSequence: number;

    constructor() {
        this.nodes = [];
        this.edges = [];
        this.adjacency = new Map();
        this.lastOperation = null;
        this.lastTraversal = [];
        this.nextNodeId = 1;
        this.nextEdgeId = 1;
        this.operationSequence = 0;
    }

    private nextSequence(): number {
        return ++this.operationSequence;
    }

    private normalizeLabel(label: string): string {
        return label.trim();
    }

    private findNodeByLabel(label: string): GraphNode | null {
        const normalized = this.normalizeLabel(label).toLowerCase();
        for(const node of this.nodes) {
            if(node.label.toLowerCase() === normalized) {
                return node;
            }
        }
        return null;
    }

    private findNodeById(id: number): GraphNode | null {
        for(const node of this.nodes) {
            if(node.id === id) {
                return node;
            }
        }
        return null;
    }

    private findEdge(sourceId: number, targetId: number): GraphEdge | null {
        for(const edge of this.edges) {
            const isMatchingDirection = edge.source === sourceId && edge.target === targetId;
            const isReverseDirection = edge.source === targetId && edge.target === sourceId;
            if(isMatchingDirection || isReverseDirection) {
                return edge;
            }
        }
        return null;
    }

    private setOperation(operation: Omit<GraphOperation, 'sequence'>): void {
        this.lastOperation = {
            sequence: this.nextSequence(),
            ...operation,
        };
    }

    private createNode(label: string): GraphNode {
        const node = new GraphNode(this.nextNodeId++, label);
        this.nodes.push(node);
        this.adjacency.set(node.id, new Set());
        return node;
    }

    private createEdge(source: GraphNode, target: GraphNode): GraphEdge {
        const edge = new GraphEdge(this.nextEdgeId++, source.id, target.id);
        this.edges.push(edge);
        this.adjacency.get(source.id)?.add(target.id);
        this.adjacency.get(target.id)?.add(source.id);
        return edge;
    }

    addNode(label: string): boolean {
        const normalized = this.normalizeLabel(label);
        if(normalized.length === 0 || this.findNodeByLabel(normalized) !== null) {
            return false;
        }

        const node = this.createNode(normalized);
        this.lastTraversal = [];
        this.setOperation({
            type: 'add-node',
            label: `Added node ${node.label}`,
            visitedNodeIds: [node.id],
            visitedEdgeIds: [],
            focusNodeId: node.id,
        });
        return true;
    }

    addEdge(sourceLabel: string, targetLabel: string): boolean {
        const source = this.findNodeByLabel(sourceLabel);
        const target = this.findNodeByLabel(targetLabel);

        if(source === null || target === null || source.id === target.id) {
            return false;
        }
        if(this.findEdge(source.id, target.id) !== null) {
            return false;
        }

        const edge = this.createEdge(source, target);
        this.lastTraversal = [];
        this.setOperation({
            type: 'add-edge',
            label: `Connected ${source.label} to ${target.label}`,
            visitedNodeIds: [source.id, target.id],
            visitedEdgeIds: [edge.id],
            focusNodeId: target.id,
        });
        return true;
    }

    clear(): void {
        this.nodes = [];
        this.edges = [];
        this.adjacency = new Map();
        this.lastOperation = null;
        this.lastTraversal = [];
        this.nextNodeId = 1;
        this.nextEdgeId = 1;
    }

    loadExample(): void {
        this.clear();

        const exampleNodes = ['A', 'B', 'C', 'D', 'E', 'F'];
        const exampleEdges: [string, string][] = [
            ['A', 'B'],
            ['A', 'C'],
            ['B', 'D'],
            ['B', 'E'],
            ['C', 'F'],
            ['E', 'F'],
        ];

        const createdNodes: GraphNode[] = [];
        for(const label of exampleNodes) {
            createdNodes.push(this.createNode(label));
        }

        for(const [sourceLabel, targetLabel] of exampleEdges) {
            const source = this.findNodeByLabel(sourceLabel);
            const target = this.findNodeByLabel(targetLabel);
            if(source !== null && target !== null) {
                this.createEdge(source, target);
            }
        }

        this.lastTraversal = [];
        this.setOperation({
            type: 'example',
            label: 'Loaded an example undirected graph',
            visitedNodeIds: createdNodes.map((node) => node.id),
            visitedEdgeIds: this.edges.map((edge) => edge.id),
            focusNodeId: createdNodes.length > 0 ? createdNodes[0].id : null,
        });
    }

    traverse(type: 'bfs' | 'dfs', startLabel: string): string[] | null {
        const startNode = this.findNodeByLabel(startLabel);
        if(startNode === null) {
            return null;
        }

        const visited = new Set<number>();
        const visitedNodeIds: number[] = [];
        const visitedEdgeIds: number[] = [];
        const traversalOrder: string[] = [];

        if(type === 'bfs') {
            const queue = new Queue<number>();
            queue.enqueue(startNode.id);
            visited.add(startNode.id);

            while(queue.getSize() > 0) {
                const currId = queue.dequeue();
                if(currId === null) {
                    continue;
                }

                const currNode = this.findNodeById(currId);
                if(currNode === null) {
                    continue;
                }

                visitedNodeIds.push(currId);
                traversalOrder.push(currNode.label);

                const neighbors = Array.from(this.adjacency.get(currId) ?? []);
                for(const neighborId of neighbors) {
                    if(!visited.has(neighborId)) {
                        visited.add(neighborId);
                        queue.enqueue(neighborId);
                        const edge = this.findEdge(currId, neighborId);
                        if(edge !== null) {
                            visitedEdgeIds.push(edge.id);
                        }
                    }
                }
            }
        }
        else {
            const stack: number[] = [startNode.id];
            const discovered = new Set<number>();
            discovered.add(startNode.id);

            while(stack.length > 0) {
                const currId = stack.pop();
                if(currId === undefined) {
                    continue;
                }

                const currNode = this.findNodeById(currId);
                if(currNode === null) {
                    continue;
                }

                visitedNodeIds.push(currId);
                traversalOrder.push(currNode.label);

                const neighbors = Array.from(this.adjacency.get(currId) ?? []);
                for(let i = neighbors.length - 1; i >= 0; i--) {
                    const neighborId = neighbors[i];
                    if(!discovered.has(neighborId)) {
                        discovered.add(neighborId);
                        stack.push(neighborId);
                        const edge = this.findEdge(currId, neighborId);
                        if(edge !== null) {
                            visitedEdgeIds.push(edge.id);
                        }
                    }
                }
            }
        }

        this.lastTraversal = traversalOrder;
        this.setOperation({
            type,
            label: `${type.toUpperCase()} order: ${traversalOrder.join(' -> ')}`,
            visitedNodeIds,
            visitedEdgeIds,
            focusNodeId: startNode.id,
        });
        return traversalOrder;
    }

    toObject(): GraphSnapshot {
        return {
            nodes: this.nodes.map((node) => ({
                id: node.id,
                label: node.label,
            })),
            edges: this.edges.map((edge) => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
            })),
        };
    }
}
