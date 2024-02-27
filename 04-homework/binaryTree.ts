interface BinaryTreeItem {
    value: number;
    left: BinaryTreeItem | null;
    right: BinaryTreeItem | null;
}

class BinaryTree {
    root: BinaryTreeItem | null;

    constructor() {
        this.root = null;
    }

    insertItem(newItem: number): void {
        const newNode: BinaryTreeItem = { value: newItem, left: null, right: null };

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this._insertNode(this.root, newNode);
    }

    inorder(handlerFunction: (value: number) => void): void {
        this._inorderInternal(this.root, handlerFunction);
    }

    breadthFirstHandler(handlerFunction: (value: number) => void): void {
        if (this.root === null)
            return;

        const queue: BinaryTreeItem[] = [this.root];
        let queuePosition: number = 0;

        while (queuePosition < queue.length) {
            const currentNode = queue[queuePosition];
            handlerFunction(currentNode.value);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }

            queuePosition++;
        }
    }

    deleteItem(nodeValue: number): void {
        if (this.root === null) {
            return;
        }
        this.root = this._deleteNode(this.root, nodeValue);
    }

    _insertNode(currentNode: BinaryTreeItem, newNode: BinaryTreeItem): void {
        if (newNode.value < currentNode.value) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this._insertNode(currentNode.left, newNode);
            }
        }
        if (newNode.value > currentNode.value) {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this._insertNode(currentNode.right, newNode);
            }
        }
    }

    _inorderInternal(currentNode: BinaryTreeItem | null, handleFunction: (value: number) => void): void {
        if (currentNode === null) {
            return;
        }
        this._inorderInternal(currentNode.left, handleFunction);
        handleFunction(currentNode.value);
        this._inorderInternal(currentNode.right, handleFunction);
    }

    _deleteNode(currentNode: BinaryTreeItem, itemValue: number): BinaryTreeItem | null {
        if (currentNode.value === itemValue) {
            if (currentNode.left === null && currentNode.right === null) {
                return null;
            }
            if (currentNode.left === null) {
                return currentNode.right;
            }

            if (currentNode.right === null) {
                return currentNode.left;
            }

            const minNodeInRightSubtree = this._findMinElement(currentNode.right)!;
            currentNode.value = minNodeInRightSubtree.value;

            currentNode.right = this._deleteNode(currentNode.right, minNodeInRightSubtree.value);
            return currentNode;
        }
        if (itemValue < currentNode.value) {
            if (currentNode.left === null) {
                return currentNode;
            }

            currentNode.left = this._deleteNode(currentNode.left, itemValue);
            return currentNode;
        }

        if (itemValue > currentNode.value) {
            if (currentNode.right === null) {
                return currentNode;
            }

            currentNode.right = this._deleteNode(currentNode.right, itemValue);
            return currentNode;
        }
        return currentNode;
    }

    _findMinElement(node: BinaryTreeItem): BinaryTreeItem {
        if (node.left === null) {
            return node;
        }
        return this._findMinElement(node.left);
    }

    search(value: number): boolean {
        return this._searchNode(this.root, value);
    }

    height(): number {
        return this._calculateHeight(this.root);
    }

    changeValue(oldValue: number, newValue: number): void {
        this.deleteItem(oldValue);
        this.insertItem(newValue);
    }

    _searchNode(node: BinaryTreeItem | null, value: number): boolean {
        if (node === null) return false;

        if (node.value === value) return true;

        if (value < node.value) {
            return this._searchNode(node.left, value);
        } else {
            return this._searchNode(node.right, value);
        }
    }

    _calculateHeight(node: BinaryTreeItem | null): number {
        if (node === null) return 0;

        const leftHeight = this._calculateHeight(node.left);
        const rightHeight = this._calculateHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }
}
