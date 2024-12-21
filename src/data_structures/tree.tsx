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
    // delete(key: T): void {
    //     if(this.root === null) {
    //         return;
    //     }

    //     // In order search (DFS) using a stack
    //     const stack = new Stack<TreeNode<T>>();
    //     stack.push(this.root);
    //     while(stack.size > 0) {
    //         const currNode = stack.pop();
            
    //     }
    // }
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
            if(currNode) { // TS gets mad due to the possibility currNode is null
                let currObj = map.get(currNode);
                if(currObj == undefined) { // typescript sucks sometimes -> I know that map is never going to return undefined but here we are
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