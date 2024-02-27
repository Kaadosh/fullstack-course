import {BinaryTreeItem} from "./binaryTreeItem";

export class BinaryTree {
    constructor() {
        this.root = null;
    }

    insertItem(newItem) {
       const newNode = new BinaryTreeItem(newItem)

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this._insertNode(this.root, newNode);
    }

    inorder(handlerFunction) {
        this._inorderInternal(this.root, handlerFunction)
    }

    breadthFirstHandler(handlerFunction) {
        if (this.root ===null)
            return;

        const queue = [this.root];
        let queuePosition = 0;

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

    deleteItem(nodeValue) {
        if (this.root === null) {
            return null;
        }
        this.root = this._deleteNode(this.root, nodeValue);
    }

    _insertNode(currentNode, newNode) {
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

    _inorderInternal(currentNode,handleFunction) {
        if (currentNode === null) {
            return;
        }
        this._inorderInternal(currentNode.left, handleFunction);
        handleFunction(currentNode.left);
        this._inorderInternal(currentNode.right, handleFunction);
    }

    _deleteNode(currentNode, itemValue) {
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

            const minNodeInRightSubtree = this._findMinElement(currentNode.right);
            currentNode.value = minNodeInRightSubtree;

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
    }

    _findMinElement(node) {
        if (node.left === null) {
            return node;
        }
        return this._findMinElement(node.left)
    }

    search(value) {
        return this._searchNode(this.root, value);
    }

    height() {
        return this._calculateHeight(this.root);
    }

    changeValue(oldValue, newValue) {
        this.deleteItem(oldValue);
        this.insertItem(newValue);
    }

    _searchNode(node, value) {
        if (node === null) return false;

        if (node.value === value) return true;

        if (value < node.value) {
            return this._searchNode(node.left, value);
        } else {
            return this._searchNode(node.right, value);
        }
    }

    _calculateHeight(node) {
        if (node === null) return 0;

        const leftHeight = this._calculateHeight(node.left);
        const rightHeight = this._calculateHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }
}