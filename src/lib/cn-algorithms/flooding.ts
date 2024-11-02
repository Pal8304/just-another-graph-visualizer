import { GraphNode } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";

export class Flooding implements GraphAlgorithm {
  Graph: AdjList;
  sourceNode: GraphNode;
  destinationNode: GraphNode;
  visited: Set<string>;
  queue: [node: GraphNode, weight: number][] = [];
  constructor(
    Graph: AdjList,
    sourceNode: GraphNode,
    destinationNode: GraphNode,
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
    if (this.visited.has(node.id)) return;
    this.visited.add(node.id);
    console.log(`Visiting node ${node} with weight ${currrentweight}`);
    if (this.Graph.has(node.id)) {
      for (const [adjacentNode, weight] of this.Graph.get(node.id) || []) {
        if (!this.visited.has(adjacentNode.id)) {
          this.queue.push([adjacentNode, weight + currrentweight]);
        }
      }
    }
  }
  previousStep() {
    console.log("Previous step");
  }
  getVisitedNodes() {
    return this.visited;
  }
}
