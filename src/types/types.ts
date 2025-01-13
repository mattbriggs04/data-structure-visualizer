import { BST, AVL, Heap } from '../data_structures/tree';
import { Stack } from "../data_structures/stack";
export type DataType<T> = {
    "linkedlist": T[];
    "bst": BST<T>;
    "stack": Stack<T>;
    "avl": AVL<T>;
    "minheap": Heap;
    "maxheap": Heap;
}