import { GraphEdge, GraphNode } from "../stores/graph";
import { AdjList } from "./utils";

export interface GraphAlgorithm {
  Graph: AdjList;
  nodes: GraphNode[];
  edges: GraphEdge[];

  onEnd: () => void;
  nextStep: () => void;
  previousStep: () => void;
  getVisitedNodes: () => Set<string>;
  getVisitedEdges: () => Set<string>;
  endAlgorithm: () => void;
}
