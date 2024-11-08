import { GraphNode } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";

export class Flooding implements GraphAlgorithm {
  Graph: AdjList;
  sourceNode: GraphNode;
  destinationNode: GraphNode;
  visited: Set<string> = new Set();
  queue: [node: GraphNode, weight: number][] = [];
  onEnd: () => void;

  initialize() {
    this.queue = [[this.sourceNode, 0]];
    this.visited = new Set();
  }

  constructor(
    Graph: AdjList,
    sourceNode: GraphNode,
    destinationNode: GraphNode,
    onEnd: () => void,
  ) {
    this.Graph = Graph;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.onEnd = onEnd;

    this.initialize();
  }

  nextStep() {
    if (this.queue.length === 0) return;
    this.queue.sort((a, b) => a[1] - b[1]);
    const [node, currrentweight] = this.queue.shift()!;
    if (node.id === this.destinationNode.id) {
      console.log("Found destination node");
      this.endAlgorithm();
      return;
    }
    if (this.visited.has(node.id)) return;
    this.visited.add(node.id);
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

  endAlgorithm() {
    this.onEnd();
    this.initialize();
  }
}
