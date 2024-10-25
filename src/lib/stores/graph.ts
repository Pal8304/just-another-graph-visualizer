import { create } from "zustand";

interface Node {
  id: string;
  nodeLabel: string;
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
  removeNode: (node: Node) => void;
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
  removeNode: (node: Node) => {
    set({
      nodes: useGraphStore.getState().nodes.filter((n) => n.id !== node.id),
    });
    console.log("Removed node", node);
  },
  setAction: (action: State["action"]) => {
    set({ action: action });
  },
}));
