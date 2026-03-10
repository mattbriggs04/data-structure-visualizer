import { Graph } from '../data_structures/graph';
import { BST, AVL, Heap } from '../data_structures/tree';
import { Stack } from '../data_structures/stack';

export type StructureType =
    | ''
    | 'linkedlist'
    | 'stack'
    | 'bst'
    | 'avl'
    | 'minheap'
    | 'maxheap'
    | 'graph';

export const structureLabels: Record<Exclude<StructureType, ''>, string> = {
    linkedlist: 'Linked List',
    stack: 'Stack',
    bst: 'Binary Search Tree',
    avl: 'AVL Tree',
    minheap: 'Min Heap',
    maxheap: 'Max Heap',
    graph: 'Graph',
};

export interface DataType {
    linkedlist: number[];
    bst: BST<number>;
    stack: Stack<number>;
    avl: AVL<number>;
    minheap: Heap;
    maxheap: Heap;
    graph: Graph;
}
