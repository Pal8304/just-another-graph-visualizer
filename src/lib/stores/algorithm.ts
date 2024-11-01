import { create } from "zustand";
import { GraphAlgorithm } from "../cn-algorithms/graph-algorithm";

interface State {
  selectedAlgorithm: "" | "flooding" | "distance-vector";
  algorithm: GraphAlgorithm | null;
}

interface Actions {
  setSelectedAlgorithm: (
    algorithm: "" | "flooding" | "distance-vector"
  ) => void;
  setAlgorithm: (algorithm: GraphAlgorithm) => void;
}

export type AlgorithmStore = State & Actions;

export const useAlgorithmStore = create<AlgorithmStore>((set) => ({
  selectedAlgorithm: "",
  algorithm: null,
  setAlgorithm: (algorithm: GraphAlgorithm) => {
    set({ algorithm });
  },
  setSelectedAlgorithm: (
    selectedAlgorithm: "" | "flooding" | "distance-vector"
  ) => {
    set({ selectedAlgorithm });
  },
}));
