import Tree from "./tree.js";

// Generate a random numbers less than 100
const randomNumbers = [];
for (let i = 0; i < 10; i++) {
    randomNumbers.push(Math.floor(Math.random() * 99)) ;
}

const tree = new Tree(randomNumbers);

console.log(tree.isBalanced());
// Printing out in level, pre, post, in order
const levelOrder = [];
tree.breadthFirstForEach((node) => {
    levelOrder.push(node.data);
})
console.log(`levelOrder: ${levelOrder}`);

let preOrder = [];
tree.preOrderForEach((node) => {
    preOrder.push(node.data);
});
console.log(`preOrder: ${preOrder}`);

let postOrder = [];
tree.postOrderForEach((node) => {
    postOrder.push(node.data);
})
console.log(`postOrder: ${postOrder}`);

let inOrder = [];
tree.inOrderForEach((node) => {
    inOrder.push(node.data);
})
console.log(`inOrder: ${inOrder}`);

// Unbalancing the tree by adding several numbers > 100.
let elementsToAdd = 10;
while (elementsToAdd > 0) {
    const randomNumber = Math.floor(Math.random() * 1000);
    if (randomNumber > 100) {
        tree.insert(randomNumber);
        elementsToAdd--;
    }
}
console.log(`isBalance(): ${tree.isBalanced()}`);

console.log(`Balancing`);
tree.rebalance();
console.log(`isBalance(): ${tree.isBalanced()}`);

preOrder = [];
tree.preOrderForEach((node) => {
    preOrder.push(node.data);
});
console.log(`preOrder: ${preOrder}`);

postOrder = [];
tree.postOrderForEach((node) => {
    postOrder.push(node.data);
})
console.log(`postOrder: ${postOrder}`);

inOrder = [];
tree.inOrderForEach((node) => {
    inOrder.push(node.data);
})
console.log(`inOrder: ${inOrder}`);




