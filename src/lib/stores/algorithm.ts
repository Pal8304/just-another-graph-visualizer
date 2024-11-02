import { create } from "zustand";
import { Flooding } from "../cn-algorithms/flooding";
import { DistanceVector } from "../cn-algorithms/distance-vector";

export type GraphAlgorithmType = typeof Flooding | typeof DistanceVector | null;

interface State {
  selectedAlgorithm: "flooding" | "distance-vector" | "";
  algorithm: GraphAlgorithmType;
}

interface Actions {
  setAlgorithm: (algorithm: State["selectedAlgorithm"]) => void;
}

const nameToAlgo: Record<State["selectedAlgorithm"], GraphAlgorithmType> = {
  flooding: Flooding,
  "distance-vector": DistanceVector,
  "": null,
};

export type AlgorithmStore = State & Actions;

export const useAlgorithmStore = create<AlgorithmStore>((set) => ({
  selectedAlgorithm: "",
  algorithm: null,
  setAlgorithm: (selectedAlgorithm: State["selectedAlgorithm"]) => {
    set({ selectedAlgorithm });
    console.log(selectedAlgorithm);
    if (nameToAlgo[selectedAlgorithm])
      set({ algorithm: nameToAlgo[selectedAlgorithm] });
  },
}));
