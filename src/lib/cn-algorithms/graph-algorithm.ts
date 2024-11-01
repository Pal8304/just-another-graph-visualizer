export interface GraphAlgorithm {
  Graph: Map<
    { node: string },
    { adjacentNodes: [node: string, weight: number | null][] }
  >;
  nextStep: () => void;
  previousStep: () => void;
}
