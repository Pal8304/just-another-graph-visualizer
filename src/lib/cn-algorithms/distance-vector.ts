import { GraphNode } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";

export class DistanceVector implements GraphAlgorithm {
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
    console.log("DistanceVector instance created");
    console.log(this.Graph);
  }
  nextStep() {
    console.log("next step dv");
  }
  previousStep() {
    console.log("Previous step dv");
  }
}
