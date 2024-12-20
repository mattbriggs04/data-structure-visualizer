import { ListNode } from "./linkedlist"
export class Queue<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    length: number = 0;

    enqueue(value: T): void {
        const newNode = new ListNode(value);
        if(this.head === null || this.tail === null) {
            this.head = newNode;
        }
        else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
    }

    dequeue(): T | null {
        if(this.head === null) {
            return null;
        }

        const ret_val = this.head.value;
        const new_head = this.head.next;
        this.head.next = null;
        this.head = new_head;
        if(this.head === null) {
            this.tail = null;
        }
        this.length--;

        return ret_val;
    }

    getSize(): number {
        return this.length;
    }
}