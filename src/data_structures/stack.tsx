import { ListNode } from "./linkedlist"

export class Stack<T> {
    top: ListNode<T> | null = null;
    size: number = 0;

    push(value: T): void {
        const newNode = new ListNode<T>(value);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;
    }
    // pop (or remove at head)
    pop(): T | null {
        if(this.top === null) {
            return null;
        }
        const val = this.top.value;
        const newTop = this.top.next;
        this.top.next = null;
        this.top = newTop;
        this.size--;

        return val;
    }
}