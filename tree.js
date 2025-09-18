import Node from "./node.js";
export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    /* 
        buildTree(array)
        sorts array of intergers and remove duplicates
        makes a balanced tree
        returns the root node of the entire array
    */

    buildTree = (array) => {
        if (array.length <= 0) return null;
        // [...array] makes a copy of the array
        let nodesArray = [...array];
        if (!this.isSortedUnique(array) || !this.isNodes(array)) {
            nodesArray = this.intToNodes(this.sortUnique(array));
        }

        const start = 0;
        const end = nodesArray.length;
        const middle = Math.floor((start + end) / 2);

        const rootNode = nodesArray[middle];
        rootNode.left = this.buildTree(nodesArray.slice(start, middle));
        rootNode.right = this.buildTree(nodesArray.slice(middle + 1));

        this.root = rootNode;
        return rootNode;
    }


    /* 
        insert(value)
        insert a node correctly at O(log n)
    */
    insert = (value) => {
        let currentNode = this.root;
        if (value == currentNode.data) throw new Error(`Value: ${value} already exist in the tree`)
        // Traverse the tree
        // Determine to go left or right

        let previousNode;
        let isLeft;
        do {
            previousNode = currentNode
            if (value < currentNode.data) {
                // Go left
                currentNode = currentNode.left;
                isLeft = true; 
            } else if (value > currentNode.data) {
                // Go Right
                currentNode = currentNode.right;
                isLeft = false;
            } else {
                throw new Error(`Value: ${value} already exist in the tree.`)
            }
        } while (currentNode)

        const newNode = new Node(value);
        if (isLeft) {
            // Point the previous node left pointer to the current node
            previousNode.left = newNode;
            return true;
        }

        previousNode.right = newNode;
        return true;
    }

    find = (value, currentNode = this.root) => {
        if (currentNode === null) return null;

        if (currentNode.data === value) return currentNode;

        const leftResult = this.find(value, currentNode.left);
        if (leftResult) return leftResult;

        return this.find(value, currentNode.right);
    }

    getSuccessor = (current) => {
        current = current.right;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    deleteItem = (value, root = this.root) => {

        if (root === null) return root;

        if (root.data > value) {
            root.left = this.deleteItem(value, root.left);
        } else if (root.data < value) {
            root.right = this.deleteItem(value, root.right);
        } else {

            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            let succ = this.getSuccessor(root);
            root.value = succ.value;
            this.right = this.deleteItem(succ.value, root.right);
        }

        return root;
    }

    levelOrderForEach = (callback) => {
        if (!callback) throw new Error(`A callback is required.`);
        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            // Push current node childrens to the queue
            if (currentNode.left instanceof Node) {
                queue.push(currentNode.left);
            }

            if (currentNode.right instanceof Node) {
                queue.push(currentNode.right);
            }

            const cb = callback(currentNode);
        }
    }

    inOrderForEach = (callback, currentNode = this.root) => {
        if (typeof callback !== 'function') throw new Error(`Callback must be a function.`);

        if (currentNode !== null) {
            this.inOrderForEach(callback, currentNode.left);
            callback(currentNode);
            this.inOrderForEach(callback, currentNode.right);
        }

    }

    preOrderForEach = (callback, currentNode = this.root) => {
        if (typeof callback !== 'function') throw new Error(`Callback must be a function.`);

        if (currentNode !== null) {
            callback(currentNode);
            this.preOrderForEach(callback, currentNode.left);
            this.preOrderForEach(callback, currentNode.right);
        }
    }

    postOrderForEach = (callback, currentNode = this.root) => {
        if (typeof callback !== 'function') throw new Error(`Callback must be a function.`);

        if (currentNode !== null) {
            this.postOrderForEach(callback, currentNode.left);
            this.postOrderForEach(callback, currentNode.right);
            callback(currentNode);
        }
    }

    height = (value) => {
        // Find the node with that value first
        const node = this.find(value);
        if (!node) throw new Error(`${value} node is not found.`);
        return this._height(node);
    }

    _height = (node) => {
        if (!node) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }

    /* 
        Helper functions 
        isSorted(array) loop through and check if [0] < [1]
        sortUnique(array) sorts and removes duplicates and returns
    */
    isSortedUnique = (array) => {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] >= array[i + 1]) {
                return false;
            } 
        }

        return true;
    }

    sortUnique = (array) => {
        // Build an array with no duplicates by checking using
        const uniqueArray = [];
        for (let i = 0; i < array.length; i++) {
            if (uniqueArray.includes(array[i])) continue;
            uniqueArray.push(array[i]);
        }
        
        // Sort the unique array using bubble sort
        let hasSwapped;
        do {
            // Comparing elements
            hasSwapped = false;
            for (let i = 0; i < uniqueArray.length; i++) {
                if (uniqueArray[i] > uniqueArray[i + 1]) {
                    const temporary = uniqueArray[i];
                    uniqueArray[i] = uniqueArray[i + 1];
                    uniqueArray[i + 1] = temporary;
                    hasSwapped = true;
                }
            }
        } while (hasSwapped)
        
        return uniqueArray;
    }

    isNodes = (array) => {
        // Returns true if all array elements are nodes
        return array.every(element => element instanceof Node);

    }

    intToNodes = (array) => {
        const nodes = [];
        array.forEach(data => {
            if (data instanceof Node) {
                nodes.push(data);
            } else {
                nodes.push(new Node(data));
            }
        });

        return nodes;
    }

    inorder = (currentRoot) => {
        if (currentRoot !== null) {
            this.inorder(currentRoot.left);
            console.log(currentRoot.data);
            this.inorder(currentRoot.right);
        }
    }
}

const tree = new Tree([1,2,3]);

console.log(tree.isSortedUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.sortUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));