export class TreeNode {
    data: number; // number for simplicity
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class BST {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(data: number): void {
        const newNode = new TreeNode(data);
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
    print(): void {
        this.printBST(this.root); // recursive helper function
    }

    private printBST(node : TreeNode | null): void {
        if(node != null) {
            console.log(`${node.data}`)
            this.printBST(node.left)
            this.printBST(node.right)
        }
    }

    // toObject() -> convert to object such that easy to process with d3
    toObject(): any { // temporary : any
        if(this.root === null) {
            return {};
        }
        let bstObj = {
            "left": this.root.left,
            "right": this.root.right,
            "data": this.root.data
        }
        let curr = this.root;
        while(curr) {
            while(curr.left) {
            }
            if(curr.right) {

            }
        }
    }
}