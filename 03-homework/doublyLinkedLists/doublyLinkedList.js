import {DoublyLinkedListNode} from "./doublyLinkedListNode";

export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value);

        if (this.tail) {
            this.tail.next = newNode;
        }

        newNode.previous = this.tail;

        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
        }

        return this;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deleteNode = currentNode;

                if (deleteNode === this.head) {
                    this.head = deleteNode.next;

                    if (deleteNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deleteNode === this.tail) {
                    this.tail = deleteNode.previous;
                    this.tail.next = null;
                } else {
                    const previousNode = deleteNode.previous;
                    const nextNode = deleteNode.next;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }
            currentNode = currentNode.next;
        }
            return deleteNode;
    }

    find(value) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;

        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail() {
        if (!this.tail) {
            return null;
        }
        const deletedTail = this.tail;

        if (this.tail.previous) {
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return  deletedTail;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

    }


}