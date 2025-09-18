import Node from "./node.js";
export default class Tree {
    root;

    constructor(array) {
        this.array = array;
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

    /* 
        Helper functions 
        isSorted(array) loop through and check if [0] < [1]
        sortUnique(array) sorts and removes duplicates and returns
    */
    isSortedUnique = (array) => {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] >= array[i+1]) {
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
                if (uniqueArray[i] > uniqueArray[i+1]) {
                    const temporary = uniqueArray[i];
                    uniqueArray[i] = uniqueArray[i+1];
                    uniqueArray[i+1] = temporary;
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
}

const tree = new Tree([1,2,3]);

console.log(tree.isSortedUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.sortUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));