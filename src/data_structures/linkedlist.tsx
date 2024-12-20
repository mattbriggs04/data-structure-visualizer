export class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class LinkedList<T> {
    head: ListNode<T> | null = null;
}