import { Queue } from "./queue"
import { Stack } from "./stack"
export class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    // for the sake of this project, we can consider two nodes equal if they have the same data
    // will be fine for case of duplicates
    equals(node: TreeNode<T>): boolean {
        return node.data === this.data;
    }
}

export interface TNodeObj<T> {
    value: T;
    children?: TNodeObj<T>[];
}

export class BST<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
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
            if(data < curr.data) {
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

    // private getInorderSuccessor(node: TreeNode<T>): TreeNode<T> {
    // }
    // private inorderTraversal(node: TreeNode<T>): TreeNode<T> {
    // }
    delete(key: T): void {
        if(this.root === null) {
            return;
        }
        // Simplest case (root is the only element and the key)
        // This check is necessary because I need the parent for when I do the dfs and root does not have one
        if(this.root.data === key && this.root.left === null && this.root.right === null) {
            this.root = null;
            return;
        }

        // In order search (DFS) using a stack - parent is required to actually change the tree structure (cannot change a current node by reference in JS/TS)
        const rootObj = {node: this.root, parent: null};
        const stack = new Stack<{
            node: TreeNode<T>; 
            parent: TreeNode<T> | null;
        }>();
        stack.push(rootObj);
        // DFS loop and deletion
        while(stack.size > 0) {
            const currObj = stack.pop();
            if(!currObj) { // Should already be accounted for by stack.size (TS forces this check)
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
                    if(!currParent) { // if there is no parent, can't make a deletion (TS forces this check)
                        console.log("Error: current parent is null in deletion\n");
                        return;
                    }
                    // Three cases: node is a leaf, node has one child, node has two children
                    // case 1: node is a leaf
                    if(currNode.left === null && currNode.right === null && currParent) {
                        if(currParent?.left?.equals(currNode)) { // if its a left child -> delete left
                            currParent.left = null;
                        }
                        else { // must be a right child -> delete right
                            currParent.right = null;
                        }
                    }
                    // case 2: node has one child
                    else if(currNode.left === null) {

                    }
                    else if(currNode.right === null) {
                    }
                    // case 3: node has two children, need to find in-order successor

                    // exit function once a deletion is successful
                    return;
                }
                else { // node not found -> return and change nothing
                    return;
                }
            }
        }
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

        // breadth first search
        const queue = new Queue<TreeNode<T>>;
        queue.enqueue(this.root);
        while(queue.getSize() > 0) {
            const currNode = queue.dequeue();
            if(currNode) {
                let currObj = map.get(currNode);
                if(currObj == undefined) {
                    currObj = { value: currNode.data };
                }

                // Convert the left node into a left object
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