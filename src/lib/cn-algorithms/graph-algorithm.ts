import { AdjList } from "./utils";

export interface GraphAlgorithm {
  Graph: AdjList;
  nextStep: () => void;
  previousStep: () => void;
  getVisitedNodes: () => Set<string>;
  endAlgorithm: () => void;
}
