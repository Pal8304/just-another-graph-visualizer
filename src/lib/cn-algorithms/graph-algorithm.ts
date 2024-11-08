import { AdjList } from "./utils";

export interface GraphAlgorithm {
  Graph: AdjList;
  onEnd: () => void;
  nextStep: () => void;
  previousStep: () => void;
  getVisitedNodes: () => Set<string>;
  endAlgorithm: () => void;
}
