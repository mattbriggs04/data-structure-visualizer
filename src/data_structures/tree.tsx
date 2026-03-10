import { Queue } from './queue';
import { Stack } from './stack';

export interface TNodeObj<T> {
    id: number;
    value: T;
    children?: TNodeObj<T>[];
}

export interface AVLNodeObj<T> {
    id: number;
    value: T;
    balance: number;
    children?: AVLNodeObj<T>[];
}

export interface HeapNodeObj {
    id: number;
    value: number;
    children?: HeapNodeObj[];
    txt: string;
    isLeft?: boolean;
}

export interface TreeOperation<T> {
    sequence: number;
    type: 'insert' | 'delete';
    value: T;
    visitedNodeIds: number[];
    focusNodeId: number | null;
    accentNodeIds?: number[];
}

export interface HeapOperation {
    sequence: number;
    type: 'insert' | 'extract';
    label: string;
    visitedNodeIds: number[];
    focusNodeId: number | null;
}

/*
*
* Binary Search Tree
*
*/
export class TreeNode<T> {
    id: number;
    data: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(data: T, id: number) {
        this.data = data;
        this.id = id;
    }

    equals<U extends TreeNode<T>>(node: U): boolean {
        return node.id === this.id;
    }
}

class Tree<T> {
    root: TreeNode<T> | null;
    protected nextNodeId: number;
    protected operationSequence: number;

    constructor() {
        this.root = null;
        this.nextNodeId = 1;
        this.operationSequence = 0;
    }

    protected createNodeId(): number {
        return this.nextNodeId++;
    }

    protected nextSequence(): number {
        return ++this.operationSequence;
    }

    print(): void {
        this.printTree(this.root);
    }

    private printTree(node: TreeNode<T> | null): void {
        if(node !== null) {
            console.log(`${node.data}`);
            this.printTree(node.left);
            this.printTree(node.right);
        }
    }
}

export class BST<T> extends Tree<T> {
    lastOperation: TreeOperation<T> | null = null;

    constructor() {
        super();
    }

    private setOperation(type: 'insert' | 'delete', value: T, visitedNodeIds: number[], focusNodeId: number | null): void {
        this.lastOperation = {
            sequence: this.nextSequence(),
            type,
            value,
            visitedNodeIds,
            focusNodeId,
        };
    }

    insert(data: T): void {
        const newNode = new TreeNode<T>(data, this.createNodeId());
        if(this.root === null) {
            this.root = newNode;
            this.setOperation('insert', data, [], newNode.id);
            return;
        }

        const visitedNodeIds: number[] = [];
        let curr = this.root;
        while(curr !== null) {
            visitedNodeIds.push(curr.id);
            if(data <= curr.data) {
                if(curr.left === null) {
                    curr.left = newNode;
                    this.setOperation('insert', data, visitedNodeIds, newNode.id);
                    return;
                }
                curr = curr.left;
            }
            else {
                if(curr.right === null) {
                    curr.right = newNode;
                    this.setOperation('insert', data, visitedNodeIds, newNode.id);
                    return;
                }
                curr = curr.right;
            }
        }
    }

    private getInOrderSuccessorPair(node: TreeNode<T> | null): {node: TreeNode<T> | null; parent: TreeNode<T> | null } {
        let parent: TreeNode<T> | null = null;
        if(node === null) {
            return {node: null, parent: null};
        }

        parent = node;
        node = node.right;
        while(node !== null && node.left !== null) {
            parent = node;
            node = node.left;
        }
        return {node, parent};
    }

    delete(key: T): void {
        if(this.root === null) {
            return;
        }

        const stack = new Stack<{
            node: TreeNode<T>;
            parent: TreeNode<T> | null;
        }>();
        stack.push({node: this.root, parent: null});

        const visitedNodeIds: number[] = [];
        while(stack.size > 0) {
            const currObj = stack.pop();
            if(currObj === null) {
                return;
            }

            const currNode = currObj.node;
            const currParent = currObj.parent;
            visitedNodeIds.push(currNode.id);

            if(key < currNode.data) {
                if(currNode.left !== null) {
                    stack.push({node: currNode.left, parent: currNode});
                    continue;
                }
                this.setOperation('delete', key, visitedNodeIds, null);
                return;
            }

            if(key > currNode.data) {
                if(currNode.right !== null) {
                    stack.push({node: currNode.right, parent: currNode});
                    continue;
                }
                this.setOperation('delete', key, visitedNodeIds, null);
                return;
            }

            const isRoot = currParent === null;
            if(currNode.left === null && currNode.right === null) {
                if(isRoot) {
                    this.root = null;
                }
                else if(currParent.left?.equals(currNode)) {
                    currParent.left = null;
                }
                else {
                    currParent.right = null;
                }
            }
            else if(currNode.left === null) {
                if(isRoot) {
                    this.root = this.root?.right ?? null;
                }
                else if(currParent.left?.equals(currNode)) {
                    currParent.left = currNode.right;
                }
                else {
                    currParent.right = currNode.right;
                }
            }
            else if(currNode.right === null) {
                if(isRoot) {
                    this.root = this.root?.left ?? null;
                }
                else if(currParent.left?.equals(currNode)) {
                    currParent.left = currNode.left;
                }
                else {
                    currParent.right = currNode.left;
                }
            }
            else {
                const successorPair = this.getInOrderSuccessorPair(currNode);
                const successorNode = successorPair.node;
                const successorParent = successorPair.parent;

                if(successorNode === null) {
                    this.setOperation('delete', key, visitedNodeIds, currNode.id);
                    return;
                }

                currNode.data = successorNode.data;
                if(successorParent?.left?.equals(successorNode)) {
                    successorParent.left = successorNode.right;
                }
                else if(successorParent !== null) {
                    successorParent.right = successorNode.right;
                }
            }

            this.setOperation('delete', key, visitedNodeIds, currNode.id);
            return;
        }
    }

    toObject(): TNodeObj<T> | null {
        if(this.root === null) {
            return null;
        }

        const bstObj: TNodeObj<T> = {
            id: this.root.id,
            value: this.root.data,
            children: [],
        };

        const map = new Map<TreeNode<T>, TNodeObj<T>>();
        map.set(this.root, bstObj);

        const queue = new Queue<TreeNode<T>>();
        queue.enqueue(this.root);
        while(queue.getSize() > 0) {
            const currNode = queue.dequeue();
            if(currNode === null) {
                continue;
            }

            let currObj = map.get(currNode);
            if(currObj === undefined) {
                currObj = { id: currNode.id, value: currNode.data };
            }

            if(currNode.left !== null) {
                const leftObj: TNodeObj<T> = {
                    id: currNode.left.id,
                    value: currNode.left.data,
                };
                if(currObj.children === undefined) {
                    currObj.children = [];
                }
                currObj.children.push(leftObj);
                map.set(currNode.left, leftObj);
                queue.enqueue(currNode.left);
            }

            if(currNode.right !== null) {
                const rightObj: TNodeObj<T> = {
                    id: currNode.right.id,
                    value: currNode.right.data,
                };
                if(currObj.children === undefined) {
                    currObj.children = [];
                }
                currObj.children.push(rightObj);
                map.set(currNode.right, rightObj);
                queue.enqueue(currNode.right);
            }
        }

        return bstObj;
    }
}

/*
*
* AVL Tree
*
*/
export class AVLNode<T> extends TreeNode<T> {
    height: number;
    left: AVLNode<T> | null = null;
    right: AVLNode<T> | null = null;

    constructor(data: T, id: number) {
        super(data, id);
        this.height = 1;
    }

    getBalance(): number {
        const heightLeft = this.left ? this.left.height : 0;
        const heightRight = this.right ? this.right.height : 0;
        return heightLeft - heightRight;
    }
}

interface AVLContext {
    visitedNodeIds: number[];
    focusNodeId: number | null;
    accentNodeIds: number[];
}

export class AVL<T> extends Tree<T> {
    root: AVLNode<T> | null = null;
    lastOperation: TreeOperation<T> | null = null;

    constructor() {
        super();
    }

    private setOperation(type: 'insert' | 'delete', value: T, context: AVLContext): void {
        this.lastOperation = {
            sequence: this.nextSequence(),
            type,
            value,
            visitedNodeIds: context.visitedNodeIds,
            focusNodeId: context.focusNodeId,
            accentNodeIds: Array.from(new Set(context.accentNodeIds)),
        };
    }

    private insertHelper(node: AVLNode<T> | null, data: T, context: AVLContext): AVLNode<T> {
        if(node === null) {
            const newNode = new AVLNode<T>(data, this.createNodeId());
            context.focusNodeId = newNode.id;
            return newNode;
        }

        context.visitedNodeIds.push(node.id);
        if(data <= node.data) {
            node.left = this.insertHelper(node.left, data, context);
        }
        else {
            node.right = this.insertHelper(node.right, data, context);
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const nodeBalance = this.getBalance(node);

        if(nodeBalance >= 2 && node.left !== null && data < node.left.data) {
            context.accentNodeIds.push(node.id);
            return this.rightRotate(node)!;
        }
        if(nodeBalance >= 2 && node.left !== null && data > node.left.data) {
            context.accentNodeIds.push(node.id);
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node)!;
        }
        if(nodeBalance <= -2 && node.right !== null && data > node.right.data) {
            context.accentNodeIds.push(node.id);
            return this.leftRotate(node)!;
        }
        if(nodeBalance <= -2 && node.right !== null && data < node.right.data) {
            context.accentNodeIds.push(node.id);
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node)!;
        }

        return node;
    }

    private deleteHelper(node: AVLNode<T> | null, data: T, context: AVLContext): AVLNode<T> | null {
        if(node === null) {
            return node;
        }

        context.visitedNodeIds.push(node.id);
        if(data < node.data) {
            node.left = this.deleteHelper(node.left, data, context);
        }
        else if(data > node.data) {
            node.right = this.deleteHelper(node.right, data, context);
        }
        else {
            context.focusNodeId = node.id;
            if(node.left === null || node.right === null) {
                node = node.left ? node.left : node.right;
            }
            else {
                const successor = this.getInOrderSuccessor(node);
                if(successor === null) {
                    return node;
                }
                node.data = successor.data;
                node.right = this.deleteHelper(node.right, successor.data, context);
            }
        }

        if(node === null) {
            return node;
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const nodeBalance = this.getBalance(node);

        if(nodeBalance >= 2 && this.getBalance(node.left) >= 0) {
            context.accentNodeIds.push(node.id);
            return this.rightRotate(node)!;
        }
        if(nodeBalance >= 2 && this.getBalance(node.left) < 0) {
            context.accentNodeIds.push(node.id);
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node)!;
        }
        if(nodeBalance <= -2 && this.getBalance(node.right) <= 0) {
            context.accentNodeIds.push(node.id);
            return this.leftRotate(node)!;
        }
        if(nodeBalance <= -2 && this.getBalance(node.right) > 0) {
            context.accentNodeIds.push(node.id);
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node)!;
        }

        return node;
    }

    insert(data: T): void {
        const context: AVLContext = {
            visitedNodeIds: [],
            focusNodeId: null,
            accentNodeIds: [],
        };
        this.root = this.insertHelper(this.root, data, context);
        this.setOperation('insert', data, context);
    }

    delete(data: T): void {
        const context: AVLContext = {
            visitedNodeIds: [],
            focusNodeId: null,
            accentNodeIds: [],
        };
        this.root = this.deleteHelper(this.root, data, context);
        this.setOperation('delete', data, context);
    }

    private getHeight(node: AVLNode<T> | null): number {
        return node !== null ? node.height : 0;
    }

    private getBalance(node: AVLNode<T> | null): number {
        return node !== null ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    private rightRotate(root: AVLNode<T>): AVLNode<T> | null {
        const newRoot = root.left;
        if(newRoot === null) {
            return null;
        }

        const subtree = newRoot.right;
        newRoot.right = root;
        root.left = subtree;

        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;

        return newRoot;
    }

    private leftRotate(root: AVLNode<T> | null): AVLNode<T> | null {
        if(root === null) {
            return null;
        }

        const newRoot = root.right;
        if(newRoot === null) {
            return null;
        }

        const subtree = newRoot.left;
        newRoot.left = root;
        root.right = subtree;

        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;

        return newRoot;
    }

    private getInOrderSuccessor(node: AVLNode<T> | null): AVLNode<T> | null {
        let curr = node;
        if(curr === null) {
            return null;
        }

        curr = curr.right;
        while(curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }

    toObject(): AVLNodeObj<T> | null {
        if(this.root === null) {
            return null;
        }

        const avlObj: AVLNodeObj<T> = {
            id: this.root.id,
            value: this.root.data,
            balance: this.getBalance(this.root),
            children: [],
        };

        const map = new Map<AVLNode<T>, AVLNodeObj<T>>();
        map.set(this.root, avlObj);

        const queue = new Queue<AVLNode<T>>();
        queue.enqueue(this.root);
        while(queue.getSize() > 0) {
            const currNode = queue.dequeue();
            if(currNode === null) {
                continue;
            }

            let currObj = map.get(currNode);
            if(currObj === undefined) {
                currObj = {
                    id: currNode.id,
                    value: currNode.data,
                    balance: this.getBalance(currNode),
                };
            }

            if(currNode.left !== null) {
                const leftObj: AVLNodeObj<T> = {
                    id: currNode.left.id,
                    value: currNode.left.data,
                    balance: this.getBalance(currNode.left),
                };
                if(currObj.children === undefined) {
                    currObj.children = [];
                }
                currObj.children.push(leftObj);
                map.set(currNode.left, leftObj);
                queue.enqueue(currNode.left);
            }

            if(currNode.right !== null) {
                const rightObj: AVLNodeObj<T> = {
                    id: currNode.right.id,
                    value: currNode.right.data,
                    balance: this.getBalance(currNode.right),
                };
                if(currObj.children === undefined) {
                    currObj.children = [];
                }
                currObj.children.push(rightObj);
                map.set(currNode.right, rightObj);
                queue.enqueue(currNode.right);
            }
        }

        return avlObj;
    }
}

/*
*
* Heap (Max and Min)
*
*/
class HeapNode {
    id: number;
    weight: number;
    text: string;

    constructor(id: number, weight: number, text: string) {
        this.id = id;
        this.weight = weight;
        this.text = text;
    }
}

export class Heap {
    arr: HeapNode[];
    type: string;
    size: number;
    lastExtracted: string | null;
    lastOperation: HeapOperation | null;
    private nextHeapNodeId: number;
    private operationSequence: number;

    constructor(type: string) {
        this.arr = [];
        this.type = type.toLowerCase();
        this.size = 0;
        this.lastExtracted = null;
        this.lastOperation = null;
        this.nextHeapNodeId = 1;
        this.operationSequence = 0;
    }

    private nextSequence(): number {
        return ++this.operationSequence;
    }

    private compare(first: HeapNode, second: HeapNode): boolean {
        return this.type === 'min' ? first.weight < second.weight : first.weight > second.weight;
    }

    private formatNode(node: HeapNode): string {
        return `(${node.text}, ${node.weight})`;
    }

    insert(weight: number, text: string): void {
        const newNode = new HeapNode(this.nextHeapNodeId++, weight, text);
        this.arr.push(newNode);
        const visitedNodeIds = this.bubbleUp(this.size);
        this.size++;
        this.lastOperation = {
            sequence: this.nextSequence(),
            type: 'insert',
            label: this.formatNode(newNode),
            visitedNodeIds,
            focusNodeId: newNode.id,
        };
    }

    bubbleUp(idx: number): number[] {
        if(this.arr[idx] === undefined) {
            return [];
        }

        let parent = Math.floor((idx - 1) / 2);
        let curr = idx;
        const visitedNodeIds = [this.arr[curr].id];
        while(parent >= 0 && this.compare(this.arr[curr], this.arr[parent])) {
            visitedNodeIds.push(this.arr[parent].id);
            const swapNode = this.arr[parent];
            this.arr[parent] = this.arr[curr];
            this.arr[curr] = swapNode;
            curr = parent;
            parent = Math.floor((curr - 1) / 2);
        }
        return visitedNodeIds;
    }

    bubbleDown(idx: number): number[] {
        if(this.size === 0 || this.arr[idx] === undefined) {
            return [];
        }

        let curr = idx;
        const visitedNodeIds = [this.arr[curr].id];
        while(true) {
            const leftIdx = 2 * curr + 1;
            const rightIdx = 2 * curr + 2;
            let swapIdx = curr;

            if(leftIdx < this.size && this.compare(this.arr[leftIdx], this.arr[swapIdx])) {
                swapIdx = leftIdx;
            }
            if(rightIdx < this.size && this.compare(this.arr[rightIdx], this.arr[swapIdx])) {
                swapIdx = rightIdx;
            }
            if(swapIdx === curr) {
                break;
            }

            visitedNodeIds.push(this.arr[swapIdx].id);
            const swapNode = this.arr[curr];
            this.arr[curr] = this.arr[swapIdx];
            this.arr[swapIdx] = swapNode;
            curr = swapIdx;
        }

        return visitedNodeIds;
    }

    extract(): HeapNode | null {
        if(this.size === 0) {
            return null;
        }

        const extractNode = this.arr[0];
        if(this.size === 1) {
            this.arr.pop();
            this.size = 0;
            this.lastExtracted = this.formatNode(extractNode);
            this.lastOperation = {
                sequence: this.nextSequence(),
                type: 'extract',
                label: this.lastExtracted,
                visitedNodeIds: [extractNode.id],
                focusNodeId: null,
            };
            return extractNode;
        }

        this.arr[0] = this.arr[this.size - 1];
        this.arr.pop();
        this.size--;
        const visitedNodeIds = this.bubbleDown(0);

        this.lastExtracted = this.formatNode(extractNode);
        this.lastOperation = {
            sequence: this.nextSequence(),
            type: 'extract',
            label: this.lastExtracted,
            visitedNodeIds,
            focusNodeId: this.size > 0 ? this.arr[0].id : null,
        };
        return extractNode;
    }

    toObject(): HeapNodeObj | null {
        if(this.size === 0) {
            return null;
        }

        const heapObj: HeapNodeObj = {
            id: this.arr[0].id,
            value: this.arr[0].weight,
            children: [],
            txt: this.arr[0].text,
        };

        const map = new Map<HeapNode, HeapNodeObj>();
        map.set(this.arr[0], heapObj);

        const queue = new Queue<number>();
        queue.enqueue(0);
        while(queue.getSize() > 0) {
            const currIdx = queue.dequeue();
            if(currIdx === null) {
                continue;
            }

            const currNode = this.arr[currIdx];
            const currObj = map.get(currNode);
            if(currObj === undefined) {
                continue;
            }

            const leftIdx = 2 * currIdx + 1;
            const rightIdx = 2 * currIdx + 2;

            if(leftIdx < this.size) {
                const leftObj: HeapNodeObj = {
                    id: this.arr[leftIdx].id,
                    value: this.arr[leftIdx].weight,
                    txt: this.arr[leftIdx].text,
                    children: [],
                    isLeft: true,
                };
                currObj.children?.push(leftObj);
                map.set(this.arr[leftIdx], leftObj);
                queue.enqueue(leftIdx);
            }

            if(rightIdx < this.size) {
                const rightObj: HeapNodeObj = {
                    id: this.arr[rightIdx].id,
                    value: this.arr[rightIdx].weight,
                    txt: this.arr[rightIdx].text,
                    children: [],
                    isLeft: false,
                };
                currObj.children?.push(rightObj);
                map.set(this.arr[rightIdx], rightObj);
                queue.enqueue(rightIdx);
            }
        }

        return heapObj;
    }
}
