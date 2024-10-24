import { create } from "zustand";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  directed: boolean;
  from: Node;
  to: Node;
  weight: number | null;
}

interface State {
  nodes: Node[];
  edges: Edge[];
  action: "view" | "add-node" | "remove-node" | "add-edge" | "remove-edge";
}

interface Actions {
  addNode: (node: Node) => void;
  addEdge: () => void;
  setAction: (action: State["action"]) => void;
}

export type GraphStore = State & Actions;

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  action: "view",
  addEdge: () => {},
  addNode: (node: Node) => {
    set({ nodes: [...useGraphStore.getState().nodes, node] });
    console.log("Added node", node);
  },
  setAction: (action: State["action"]) => {
    set({ action: action });
  },
}));
