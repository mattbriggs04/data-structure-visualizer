import { ListNode } from "./linkedlist"

// this implementation is more C-like, while an array in JS is effectively a stack by default (arrays have a .push and .pop operation)
// I implemented it this way 1. for fun and learning and 2. to illustrate what is really going on to anyone reading the code
export class Stack<T> {
    top: ListNode<T> | null = null;
    size: number = 0;
    lastPopped: T | null = null;
    stackArr: T[] = []; // JS arrays are stack-like by default (see comment above class definition), this is what is actually used for visualization

    push(value: T): void {
        const newNode = new ListNode<T>(value);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;

        this.stackArr.push(value); // JS arrays are stack-like by default, above demonstrates how that code would look
    }
    // pop (or remove at head)
    pop(): T | null {
        this.stackArr.pop(); // JS arrays are stack-like by default, below demonstrates how that code would look

        if(this.top === null) {
            return null;
        }
        const val = this.top.value;
        const newTop = this.top.next;
        this.top.next = null;
        this.top = newTop;
        this.size--;

        this.lastPopped = val;
        return val;
    }

    // conversion for ease of use by the visualizer
    getArr(): T[] | null {
        return this.stackArr;
    }
}