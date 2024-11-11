import { GraphNode, GraphEdge } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";
import { useGraphStore } from "../stores/graph";

export class DistanceVector implements GraphAlgorithm {
  Graph: AdjList;
  sourceNode: GraphNode;
  destinationNode: GraphNode;
  visited: Set<string> = new Set();
  visitedEdges: Set<string> = new Set();
  queue: [{ node: string; parent: string }][] = [];
  public distanceVector: Map<string, Map<string, [number, string | null]>> =
    new Map(); // node -> [node -> [distance, nextHop]]
  distanceVectorCreated: boolean = false;
  edges: GraphEdge[] = [];
  onEnd: () => void;
  initialize() {
    this.queue = [];
    this.visited = new Set();
    this.visitedEdges = new Set();
    this.distanceVector = new Map();
    this.distanceVectorCreated = false;
    this.edges = useGraphStore.getState().edges;
    const nodes = Array.from(this.Graph.keys());
    for (const node of nodes) {
      this.queue.push([{ node, parent: "" }]);
    }
    for (const node of nodes) {
      this.distanceVector.set(node, new Map());
      for (const node2 of nodes) {
        this.distanceVector
          .get(node)!
          .set(node2, node === node2 ? [0, null] : [Infinity, null]);
      }
    }
  }

  constructor(
    Graph: AdjList,
    sourceNode: GraphNode,
    destinationNode: GraphNode,
    onEnd: () => void
  ) {
    this.Graph = Graph;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.distanceVector = new Map();
    this.onEnd = onEnd;

    this.initialize();
  }
  nextStep() {
    console.log("Next step dv");
    if (this.queue.length === 0 && !this.distanceVectorCreated) {
      console.log("Distance Vectors are calculated");
      this.distanceVectorCreated = true;
      this.queue.push([{ node: this.sourceNode.id, parent: "" }]);
      this.visitedEdges = new Set();
      return;
    }
    if (this.queue.length === 0 && this.distanceVectorCreated) {
      console.log("End of algorithm");
      this.endAlgorithm();
      return;
    }
    if (!this.distanceVectorCreated) {
      const queueNode = this.queue.shift()![0];
      const currentNode = queueNode.node;
      const parent = queueNode.parent;
      //console.log(currentNode);
      const edge = this.edges.find((edge) => {
        if (edge.directed) {
          return edge.from.id === currentNode && edge.to.id === parent;
        }
        return (
          (edge.from.id === currentNode && edge.to.id === parent) ||
          (edge.to.id === currentNode && edge.from.id === parent)
        );
      });
      console.log("Current node: ", currentNode, "Parent: ", parent);
      console.log(this.edges);
      console.log(edge);
      if (edge !== undefined) {
        this.visitedEdges.add(edge.id);
      }
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
            this.queue.push([{ node: currentNode, parent }]);
          } else if (
            adjacentDistance !== Infinity &&
            weight + adjacentDistance < currentDistance
          ) {
            this.distanceVector
              .get(currentNode)!
              .set(node, [weight + adjacentDistance, adjacentNodeID]);
            this.queue.push([{ node: currentNode, parent }]);
          }
        }
      }
    } else {
      const queueNode = this.queue.shift()![0];
      const currentNode = queueNode.node;
      const parent = queueNode.parent;
      const edge = this.edges.find((edge) => {
        if (edge.directed) {
          return edge.from.id === currentNode && edge.to.id === parent;
        }
        return (
          (edge.from.id === currentNode && edge.to.id === parent) ||
          (edge.to.id === currentNode && edge.from.id === parent)
        );
      });
      if (edge !== undefined) {
        this.visitedEdges.add(edge.id);
      }
      console.log(this.visitedEdges);
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
        this.queue.push([{ node: nextHop, parent: currentNode }]);
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
  getVisitedEdges() {
    console.log(this.visitedEdges);
    return this.visitedEdges;
  }
  endAlgorithm() {
    this.onEnd();
    this.initialize();
  }
}
