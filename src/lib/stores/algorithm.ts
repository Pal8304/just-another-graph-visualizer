import { create } from "zustand";
import { Flooding } from "../cn-algorithms/flooding";
import { DistanceVector } from "../cn-algorithms/distance-vector";
import { persist } from "zustand/middleware";
import { GraphNode } from "./graph";
import { GraphAlgorithm } from "../cn-algorithms/graph-algorithm";

export type GraphAlgorithmType = typeof Flooding | typeof DistanceVector | null;

interface State {
  selectedAlgorithm: "flooding" | "distance-vector" | "";
  algorithm: GraphAlgorithmType;
  instance: GraphAlgorithm | null;

  source: GraphNode | null;
  destination: GraphNode | null;
}

interface Actions {
  setAlgorithm: (algorithm: State["selectedAlgorithm"]) => void;
  setInstance: (instance: GraphAlgorithm) => void;

  setSource: (source: GraphNode) => void;
  setDestination: (destination: GraphNode) => void;
}

const nameToAlgo: Record<State["selectedAlgorithm"], GraphAlgorithmType> = {
  flooding: Flooding,
  "distance-vector": DistanceVector,
  "": null,
};

export type AlgorithmStore = State & Actions;

export const useAlgorithmStore = create(
  persist<AlgorithmStore>(
    (set) => ({
      selectedAlgorithm: "",
      algorithm: null,
      instance: null,

      // TODO: handle case where when use removes a node, then check if its source or destination and reset it if it is
      source: null,
      setSource: (source) => set({ source }),

      destination: null,
      setDestination: (destination) => set({ destination }),

      setAlgorithm: (selectedAlgorithm: State["selectedAlgorithm"]) => {
        set({ selectedAlgorithm });
        console.log(selectedAlgorithm);
        if (nameToAlgo[selectedAlgorithm])
          set({ algorithm: nameToAlgo[selectedAlgorithm] });
      },
      setInstance: (instance) =>
        set({
          instance,
        }),
    }),
    {
      name: "algo-store",
    },
  ),
);
