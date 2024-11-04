import { GraphNode } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";

export class DistanceVector implements GraphAlgorithm {
  Graph: AdjList;
  sourceNode: GraphNode;
  destinationNode: GraphNode;
  visited: Set<string>;
  queue: [node: string][] = [];
  distanceVector: Map<string, Map<string, [number, string | null]>> = new Map(); // node -> [node -> [distance, nextHop]]
  distanceVectorCreated: boolean = false;
  constructor(
    Graph: AdjList,
    sourceNode: GraphNode,
    destinationNode: GraphNode
  ) {
    this.Graph = Graph;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.visited = new Set();
    const nodes = Array.from(this.Graph.keys());
    for (const node of nodes) {
      this.queue.push([node]);
    }
    for (const node of nodes) {
      this.distanceVector.set(node, new Map());
      for (const node2 of nodes) {
        this.distanceVector
          .get(node)!
          .set(node2, node === node2 ? [0, null] : [Infinity, null]);
      }
    }
    console.log("DistanceVector instance created");
    console.log(this.Graph);
  }
  nextStep() {
    console.log("Next step dv");
    if (this.queue.length === 0 && !this.distanceVectorCreated) {
      console.log("Distance Vectors are calculated");
      this.distanceVectorCreated = true;
      this.queue.push([this.sourceNode.id]);
      return;
    }
    if (this.queue.length === 0 && this.distanceVectorCreated) {
      console.log("End of algorithm");
      this.endAlgorithm();
      return;
    }
    if (!this.distanceVectorCreated) {
      const currentNode = this.queue.shift()![0];
      console.log(currentNode);
      const neighbors = this.Graph.get(currentNode);
      if (!neighbors) return;
      for (const [adjacentNode, weight] of neighbors) {
        const adjacentNodeID = adjacentNode.id;
        const nodes = Array.from(this.Graph.keys());
        for (const node of nodes) {
          const currentDistance = this.distanceVector
            .get(currentNode)!
            .get(node)![0];
          const adjacentDistance = this.distanceVector
            .get(adjacentNodeID)!
            .get(node)![0];
          if (currentDistance === Infinity && adjacentDistance !== Infinity) {
            this.distanceVector
              .get(currentNode)!
              .set(node, [weight + adjacentDistance, adjacentNodeID]);
            this.queue.push([currentNode]);
          } else if (
            adjacentDistance !== Infinity &&
            weight + adjacentDistance < currentDistance
          ) {
            this.distanceVector
              .get(currentNode)!
              .set(node, [weight + adjacentDistance, adjacentNodeID]);
            this.queue.push([currentNode]);
          }
        }
      }
    } else {
      const currentNode = this.queue.shift()![0];
      this.visited.add(currentNode);
      if (currentNode === this.destinationNode.id) {
        console.log("Destination node reached");
        this.endAlgorithm();
        return;
      }
      const nextHop = this.distanceVector
        .get(currentNode)!
        .get(this.destinationNode.id)![1];
      if (nextHop !== null) {
        this.queue.push([nextHop]);
      }
      console.log("Current Node: ", currentNode, "Next Hop: ", nextHop);
    }
    console.log(this.distanceVector);
  }
  previousStep() {
    console.log("Previous step dv");
  }
  getVisitedNodes() {
    return this.visited;
  }
  endAlgorithm() {
    this.visited = new Set();
    console.log("End Algorithm");
  }
}
