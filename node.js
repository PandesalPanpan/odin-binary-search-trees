export default class Node {
    constructor(data, leftNode, rightNode) {
        this.data = data;
        this.leftNode = leftNode ?? null;
        this.rightNode = rightNode ?? null;
    }
}