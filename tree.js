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
        // [...array] makes a copy of the array
        let copy = [...array];
        if (!this.isSortedUnique(array)) {
            copy = this.sortUnique(array);
        }
        const uniqueArray = [...copy];

        // BST Creating the balanced tree
        // Get the root(middle node)
        const start = 0;
        const end = uniqueArray.length;
        const middle = Math.floor((start + end) / 2);

        // Check the middle

        // Return a root node
        return uniqueArray[middle];
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
}

const tree = new Tree([1,2,3]);

console.log(tree.isSortedUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.sortUnique([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));