export interface INode {
    value: Value;
    next: DoublyLinkedListNode | null;
    previous: DoublyLinkedListNode | null;
    toString(fn?: Fn): string;
}

export type Fn = (value: { [ket: string]: any }) => string;

export type Value = number | string | { [ket: string]: any };

export class DoublyLinkedListNode implements INode {
    constructor(
        public value: Value,
        public next: DoublyLinkedListNode | null = null,
        public previous: DoublyLinkedListNode | null = null,
    ) {}

    public toString(callback?: Fn): string {
        return callback
            ? callback(this.value as { [ket: string]: any })
            : `${this.value}`;
    }
}

export interface INodeList {
    head: DoublyLinkedListNode | null;
    tail: DoublyLinkedListNode | null;
    prepend(value: Value): DoublyLinkedList;
    append(value: Value): DoublyLinkedList;
    delete(value: Value): DoublyLinkedListNode | null;
    find(value?: Value | undefined): DoublyLinkedListNode | null;
    deleteTail(): DoublyLinkedListNode | null;
    deleteHead(): DoublyLinkedListNode | null;
    fromArray(values: Array<Value>): DoublyLinkedList;
    toArray(): DoublyLinkedListNode[];
    toString(callback?: Fn): string;
    reverse(): DoublyLinkedList;
}

export class DoublyLinkedList implements INodeList {
    public head: DoublyLinkedListNode | null = null;
    public tail: DoublyLinkedListNode | null = null;


    prepend(value: Value): DoublyLinkedList {
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


    append(value: Value): DoublyLinkedList {
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

    delete(value: Value): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head as DoublyLinkedListNode | null;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;

                if (deletedNode === this.head) {


                    this.head = deletedNode.next;


                    if (this.head) {
                        this.head.previous = null;
                    }



                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {


                    this.tail = deletedNode.previous as DoublyLinkedListNode;
                    this.tail.next = null;
                } else {
                    // Если средний узел будет удален ...
                    const previousNode = deletedNode.previous as DoublyLinkedListNode;
                    const nextNode = deletedNode.next as DoublyLinkedListNode;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value?: Value | undefined): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        let currentNode: DoublyLinkedListNode | null = this.head;

        while (currentNode) {
            // Если указано значение, пробуем сравнить по значению.
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail(): DoublyLinkedListNode | null {
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

        return deletedTail;
    }

    deleteHead(): DoublyLinkedListNode | null {
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

        return deletedHead;
    }

    fromArray(values: Array<Value>): DoublyLinkedList {
        values.forEach((value: Value) => this.append(value));

        return this;
    }

    toArray(): DoublyLinkedListNode[] {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback?: Fn): string {
        return this.toArray()
            .map((node) => node.toString(callback))
            .toString();
    }

    reverse(): DoublyLinkedList {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {

            nextNode = currNode.next;
            prevNode = currNode.previous;


            currNode.next = prevNode;
            currNode.previous = nextNode;


            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}