import { GraphAlgorithm } from "./graph-algorithm";

class Flooding implements GraphAlgorithm {
  Graph: Map<
    { node: string },
    { adjacentNodes: [node: string, weight: number][] }
  >;
  sourceNode: string;
  destinationNode: string;
  visited: Set<string>;
  queue: [node: string, weight: number][] = [];
  constructor(
    Graph: Map<
      { node: string },
      { adjacentNodes: [node: string, weight: number][] }
    >,
    sourceNode: string,
    destinationNode: string
  ) {
    this.Graph = Graph;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.visited = new Set();
    this.queue.push([sourceNode, 0]);
    console.log("Flooding instance created");
    console.log(this.Graph);
  }
  nextStep() {
    if (this.queue.length === 0) return;
    this.queue.sort((a, b) => a[1] - b[1]);
    const [node, currrentweight] = this.queue.shift()!;
    if (node === this.destinationNode) return;
    if (this.visited.has(node)) return;
    this.visited.add(node);
    console.log(`Visiting node ${node} with weight ${currrentweight}`);
    if (this.Graph.has({ node })) {
      for (const [adjacentNode, weight] of this.Graph.get({ node })!
        .adjacentNodes) {
        if (!this.visited.has(adjacentNode)) {
          this.queue.push([adjacentNode, weight + currrentweight]);
        }
      }
    }
  }
  previousStep() {
    console.log("Previous step");
  }
}

export default Flooding;
