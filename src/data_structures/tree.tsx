import { Queue } from "./queue"
import { Stack } from "./stack"

// For processing by visualizers need an object with value and children
export interface TNodeObj<T> {
    value: T;
    children?: TNodeObj<T>[];
}
export interface AVLNodeObj<T> {
    value: T;
    balance: number;
    children?: AVLNodeObj<T>[];
}

// Generic binary tree node 
export class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }

    // for the sake of this project, we can consider two nodes equal if they have the same data
    equals<U extends TreeNode<T>>(node: U): boolean {
        return node.data === this.data;
    }
}

class Tree<T> {
    root: TreeNode<T> | null;
    constructor() {
        this.root = null;
    }

    // debug print function (printTree is a helper)
    print(): void {
        this.printTree(this.root);
    }
    private printTree(node : TreeNode<T> | null): void {
        if(node != null) {
            console.log(`${node.data}`)
            this.printTree(node.left)
            this.printTree(node.right)
        }
    }
}

// Binary search tree
export class BST<T> extends Tree<T> {
    constructor() {
        super();
    }

    insert(data: T): void {
        const newNode = new TreeNode<T>(data);
        // const path: TreeNode[] = []; // may want to store the path for animation purposes and return it
        // TS doesn't do pass by reference / addr so no recursion today (yes I know you can also return for recursion)
        if(this.root == null) {
            this.root = newNode;
            return;
        }
    
        let curr = this.root;
        while(curr) {
            if(data <= curr.data) {
                if(curr.left === null) {
                    curr.left = newNode;
                    break;
                }
                curr = curr.left
            }
            else {
                if(curr.right === null) {
                    curr.right = newNode;
                    break;
                }
                curr = curr.right
            }
        }
        return;
    }

    // pair of node and its parent
    private getInOrderSuccessorPair(node: TreeNode<T> | null): {node: TreeNode<T> | null; parent: TreeNode<T> | null } {
        let parent: TreeNode<T> | null = null;
        // In order successor is the min of the right subtree (go right and then down left as far as possible)
        if(!node) {
            return {node: node, parent: parent};
        }
        parent = node;
        node = node.right; // right one
        while(node && node.left) {
            parent = node;
            node = node.left; // left as much as possible
        }
        return {node: node, parent: parent};
    }
    // private inorderTraversal(node: TreeNode<T>): TreeNode<T> {
    // }
    delete(key: T): void {
        if(this.root === null) {
            return;
        }
        // simplest case (root is the only element and the key)
        // this check is necessary because I need the parent for when I do the dfs and root does not have one
        if(this.root.data === key && this.root.left === null && this.root.right === null) {
            this.root = null;
            return;
        }

        // in order search (DFS) using a stack - parent is required to actually change the tree structure (cannot change a current node by reference in JS/TS)
        const rootObj = {node: this.root, parent: null};
        const stack = new Stack<{
            node: TreeNode<T>; 
            parent: TreeNode<T> | null;
        }>();
        stack.push(rootObj);
        // DFS loop and deletion
        while(stack.size > 0) {
            const currObj = stack.pop();
            if(!currObj) { // should already be accounted for by stack.size (TS forces this check)
                console.log("Error: currObj is null in deletion");
                return;
            }

            const currNode = currObj['node'];
            const currParent = currObj['parent'];
            if(currNode) {
                if(key < currNode.data && currNode.left) { 
                    const nextObj = {node: currNode.left, parent: currNode};
                    stack.push(nextObj);
                }
                else if(key > currNode.data && currNode.right) {
                    const nextObj = {node: currNode.right, parent: currNode};
                    stack.push(nextObj);
                }
                else if(key == currNode.data) {
                    const isRoot = !currParent; // if there isn't a parent it has to be the root node

                    // three cases: node is a leaf, node has one child, node has two children
                    // case 1: node is a leaf (no children)
                    if(currNode.left === null && currNode.right === null && currParent) {
                        if(currParent?.left?.equals(currNode)) { // if its a left child -> delete left
                            currParent.left = null;
                        }
                        else { // must be a right child -> delete right
                            currParent.right = null;
                        }
                    }
                    // case 2: node has one child (similar to case 1)
                    else if(currNode.left === null) {
                        if(isRoot) {
                            this.root = this.root.right;
                        }
                        else if(currParent?.left?.equals(currNode)) {
                            currParent.left = currNode.right;
                        }
                        else {
                            currParent.right = currNode.right;
                        }
                    }
                    else if(currNode.right === null) {
                        if(isRoot) {
                            this.root = this.root.left;
                        }
                        else if(currParent?.left?.equals(currNode)) {
                            currParent.left = currNode.left;
                        }
                        else {
                            currParent.right = currNode.left;
                        }
                    }

                    // case 3: node has two children, need to find in-order successor to replace with
                    else { // currNode.left && currNode.right both are not null
                        const successorPair = this.getInOrderSuccessorPair(currNode);
                        const successorNode = successorPair['node'];
                        const successorParent = successorPair['parent'];

                        if(!successorNode) {
                            console.log("Error: no in order successor found");
                            return;
                        }
                        // replace the current node with inorder successor (we can just use the data values for this)
                        currNode.data = successorNode.data;

                        // remove inorder successor by replacing it with its right child (its not possible for it to have a left child by definition)
                        if (successorParent?.left?.equals(successorNode)) {
                            successorParent.left = successorNode.right;
                        } else if (successorParent) {
                            successorParent.right = successorNode.right;
                        }
                    }
                    // exit function once a deletion is successful
                    return;
                }
                else { // node not found -> return and change nothing
                    return;
                }
            }
        }
    }

    // toObject() -> convert to object so that it is proccessable by hierarchy and Tree from d3 (there is a specific format that is expected)
    toObject(): TNodeObj<T> | null {
        if(this.root === null) {
            return null;
        }
        let bstObj: TNodeObj<T> = { 
            value: this.root.data,
            children: []
         };

        // map can get the current object for each node that is pulled out (allows the ability to iterate into nested objects)
        const map = new Map<TreeNode<T>, TNodeObj<T>>();
        map.set(this.root, bstObj);

        // BFS
        const queue = new Queue<TreeNode<T>>();
        queue.enqueue(this.root);
        while(queue.getSize() > 0) {
            const currNode = queue.dequeue();
            if(currNode) {
                let currObj = map.get(currNode);
                if(currObj == undefined) {
                    currObj = { value: currNode.data };
                }

                // convert the left node into a left object
                if(currNode?.left) {
                    const leftObj: TNodeObj<T> = { value: currNode.left.data };
                    if(currObj.children == undefined) {
                        currObj.children = [];
                    }
                    currObj.children.push(leftObj);
                    map.set(currNode.left, leftObj);
                    queue.enqueue(currNode.left);
                    
                }

                // convert right node into a right object
                if(currNode?.right) {
                    const rightObj: TNodeObj<T> = { value: currNode.right.data }
                    if(currObj.children == undefined) {
                        currObj.children = [];
                    }
                    currObj.children.push(rightObj);
                    map.set(currNode.right, rightObj);
                    queue.enqueue(currNode.right);
                }
            }
        }
        return bstObj;
    }
}


/*
*
*   AVL Tree
* 
*/
export class AVLNode<T> extends TreeNode<T> {
    height: number;
    left: AVLNode<T> | null = null;
    right: AVLNode<T> | null = null;

    constructor(data: T) {
        super(data);
        this.height = 1; // non-null nodes have a height of 1
    }

    // balance defined left - right
    getBalance(): number {
        const height_left = this.left ? this.left.height : 0;
        const height_right = this.right ? this.right.height : 0;
        return height_left - height_right;
    }
}
export class AVL<T> extends Tree<T> {
    root: AVLNode<T> | null = null;
    constructor() {
        super();
    }

    // Inspired by GeeksForGeeks implementation of AVL Tree insert
    private insertHelper(node: AVLNode<T> | null, data: T): AVLNode<T> {
        if(node === null) {
            return new AVLNode(data);
        }

        if(data <= node.data) { // equality goes left 
            node.left = this.insertHelper(node.left, data);
        }
        else {
            node.right = this.insertHelper(node.right, data);
        }

        // note: balance is defined as left - right (right - left works too, but would need to flip the cases)
        // if left side height is larger than the right, then nodeBalance would be positive
        // a tree is unbalanced if the magnitude of its balance is 2 or more
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const nodeBalance = this.getBalance(node);

        // 4 Cases for node becoming unbalanced
        // left subtree tree is larger, need to rotate to the right
        if(nodeBalance >= 2 && data < node.left!.data) {
            return this.rightRotate(node)!;
        }
        // left subtree is larger, but the path up from the inserted node comes from the 
        // right subtree of the left node, requiring first a left rotation then a right rotation 
        if(nodeBalance >= 2 && data > node.left!.data) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node)!;
        }
        // right subtree is larger, rotate to the left
        if(nodeBalance <= -2 && data > node.right!.data) {
            return this.leftRotate(node)!;
        }
        // right subtree is larger, but the path up from the inserted node comes from the
        // left subtree of the right node, requiring first a right rotation then a left rotation
        if(nodeBalance <= -2 && data < node.right!.data) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node)!;
        }

        return node;
    }
    
    // adapted from GeeksForGeeks implementation of AVL deletion
    private deleteHelper(node: AVLNode<T> | null, data: T): AVLNode<T> | null {
        if (node === null) return node;

        if(data < node.data) {
            node.left = this.deleteHelper(node.left, data);
        }
        else if(data > node.data) {
            node.right = this.deleteHelper(node.right, data);
        } else { // equality case, delete node found -> delete
            // case 1 / 2: no child or one child
            if(node.left === null || node.right === null) {
                node = null;
            }
            else { // case 3: node has both children, replace node w/ in order successor
                const successor = this.getInOrderSuccessor(node); // get successor
                node.data = successor!.data; // replace data
                node.right = this.deleteHelper(node.right, successor!.data) // delete the successor
            }
        }

        // update height
        if(node === null) return node;
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // rebalance - same as insert
        const nodeBalance = this.getBalance(node);
        // left subtree tree is larger, need to rotate to the right
        if(nodeBalance >= 2 && data < node.left!.data) {
            return this.rightRotate(node)!;
        }
        // left subtree is larger, but the path up from the inserted node comes from the 
        // right subtree of the left node, requiring first a left rotation then a right rotation 
        if(nodeBalance >= 2 && data > node.left!.data) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node)!;
        }
        // right subtree is larger, rotate to the left
        if(nodeBalance <= -2 && data > node.right!.data) {
            return this.leftRotate(node)!;
        }
        // right subtree is larger, but the path up from the inserted node comes from the
        // left subtree of the right node, requiring first a right rotation then a left rotation
        if(nodeBalance <= -2 && data < node.right!.data) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node)!;
        }
        return node;
    }

    // wrapper function for recursive insertion
    insert(data: T): void {
        this.root = this.insertHelper(this.root, data);
    }

    // wrapper function for recursive deletion
    delete(data: T): void {
        this.root = this.deleteHelper(this.root, data);
    }

    private getHeight(node: AVLNode<T> | null) {
        return node !== null ? node.height : 0;
    }

    private getBalance(node: AVLNode<T> | null): number {
        return node !== null ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    private rightRotate(root: AVLNode<T>): AVLNode<T> | null {
        const newRoot = root.left;
        if(newRoot === null) return null;
        const subtree = newRoot.right;

        // rotate to the right (order matters, newRoot.right must be changed first)
        newRoot.right = root;
        root.left = subtree;

        // update the height values (order matters, root.height must be changed first since it is lower)
        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
    
        return newRoot;
    }

    private leftRotate(root: AVLNode<T>) {
        const newRoot = root.right;

        // in theory newRoot == null should never happen, but is there to make typescript happy
        if(newRoot === null) return null;

        const subtree: AVLNode<T> | null = newRoot.left;

        // rotate to the right (order matters, newRoot.right must be changed first)
        newRoot.left = root;
        root.right = subtree;

        // update the height values (order matters, root.height must be changed first, since it is lower)
        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
        
        return newRoot;
    }

    private getInOrderSuccessor(node: AVLNode<T> | null): AVLNode<T> | null {
        let curr = node; 
        if(!curr) return null
        curr = curr.right;
        while(curr && curr.left) {
            curr = curr.left;
        }
        return curr;
    }

    // toObject(), same as BST's toObject() but holds a balance factor
    toObject(): AVLNodeObj<T> | null {
        if(this.root === null) {
            return null;
        }
        let avlObj: AVLNodeObj<T> = { 
            value: this.root.data,
            balance: this.getBalance(this.root),
            children: []
         };

        // map can get the current object for each node that is pulled out (allows the ability to iterate into nested objects)
        const map = new Map<AVLNode<T>, AVLNodeObj<T>>();
        map.set(this.root, avlObj);

        // BFS
        const queue = new Queue<AVLNode<T>>();
        queue.enqueue(this.root);
        while(queue.getSize() > 0) {
            const currNode = queue.dequeue();
            if(currNode) {
                let currObj = map.get(currNode);
                if(currObj == undefined) {
                    currObj = { value: currNode.data, balance: this.getBalance(currNode) };
                }

                // convert the left node into a left object
                if(currNode.left) {
                    const leftObj: AVLNodeObj<T> = { value: currNode.left.data, balance: this.getBalance(currNode.left) };
                    if(currObj.children == undefined) {
                        currObj.children = [];
                    }
                    currObj.children.push(leftObj);
                    map.set(currNode.left, leftObj);
                    queue.enqueue(currNode.left);
                    
                }

                // convert right node into a right object
                if(currNode.right) {
                    const rightObj: AVLNodeObj<T> = { value: currNode.right.data, balance: this.getBalance(currNode.right) }
                    if(currObj.children == undefined) {
                        currObj.children = [];
                    }
                    currObj.children.push(rightObj);
                    map.set(currNode.right, rightObj);
                    queue.enqueue(currNode.right);
                }
            }
        }
        return avlObj;
    }
}