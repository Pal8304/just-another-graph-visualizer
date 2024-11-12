import { GraphNode, GraphEdge, useGraphStore } from "../stores/graph";
import { GraphAlgorithm } from "./graph-algorithm";
import { AdjList } from "./utils";

export class Flooding implements GraphAlgorithm {
  Graph: AdjList;
  nodes: GraphNode[];
  edges: GraphEdge[];
  sourceNode: GraphNode;
  destinationNode: GraphNode;
  visited: Set<string> = new Set();
  visitedEdges: Set<string> = new Set();
  queue: [node: GraphNode, parent: GraphNode | null, weight: number][] = [];
  onEnd: () => void;
  parentMap: Map<string, string> = new Map();

  initialize() {
    this.queue = [[this.sourceNode, null, 0]];
    this.visited = new Set();
    this.visitedEdges = new Set();
    this.edges = useGraphStore.getState().edges;
  }

  constructor(
    Graph: AdjList,
    nodes: GraphNode[],
    edges: GraphEdge[],
    sourceNode: GraphNode,
    destinationNode: GraphNode,
    onEnd: () => void,
  ) {
    this.Graph = Graph;
    this.nodes = nodes;
    this.edges = edges;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.onEnd = onEnd;

    this.initialize();
  }

  nextStep() {
    if (this.queue.length === 0) return;
    this.queue.sort((a, b) => a[2] - b[2]);
    const [node, parent, currrentweight] = this.queue.shift()!;
    this.parentMap.set(node.id, parent?.id || "");
    if (node.id === this.destinationNode.id) {
      console.log("Found destination node");
      this.visited.add(node.id);
      console.log(node, parent);
      this.visitedEdges.add(
        this.edges.find(
          (edge) =>
            (edge.from.id === node.id && edge.to.id === parent?.id) ||
            (edge.from.id === parent?.id && edge.to.id === node.id),
        )!.id,
      );
      this.endAlgorithm();
      return;
    }
    const edge = this.edges.find((edge) => {
      if (edge.directed) {
        return edge.from.id === node.id && edge.to.id === parent?.id;
      } else {
        return (
          (edge.from.id === node.id && edge.to.id === parent?.id) ||
          (edge.from.id === parent?.id && edge.to.id === node.id)
        );
      }
    });
    if (edge) {
      this.visitedEdges.add(edge.id);
    }
    if (this.visited.has(node.id)) return;
    this.visited.add(node.id);
    if (this.Graph.has(node.id)) {
      for (const [adjacentNode, weight] of this.Graph.get(node.id) || []) {
        if (!this.visited.has(adjacentNode.id)) {
          this.queue.push([adjacentNode, node, weight + currrentweight]);
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

  getParentMap() {
    return this.parentMap;
  }

  getVisitedEdges() {
    return this.visitedEdges;
  }

  endAlgorithm() {
    this.onEnd();
    setTimeout(() => this.initialize(), 10);
  }
}
