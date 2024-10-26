import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  selectedNode: Node | null;
  action: "view" | "add-node" | "remove-node" | "add-edge" | "remove-edge";
}

interface Actions {
  addNode: (node: Node) => void;
  removeNode: (node: Node) => void;
  addEdge: (from: Node, to: Node) => void;
  removeEdge: (from: Node, to: Node) => void;
  setSelectedNode: (node: Node) => void;
  setAction: (action: State["action"]) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
}

export type GraphStore = State & Actions;

export const useGraphStore = create(
  persist<GraphStore>(
    (set) => ({
      nodes: [],
      edges: [],
      action: "view",
      selectedNode: null,
      addEdge: (from: Node, to: Node) => {
        set(({ edges }) => ({
          edges: [...edges, { directed: false, from, to, weight: null }],
        }));
      },
      removeEdge: (from: Node, to: Node) => {
        // might have to change this to removeEdge: (edge: Edge) cause of multiple edges
        set(({ edges }) => ({
          edges: edges.filter(
            (edge) => edge.from.id !== from.id || edge.to.id !== to.id,
          ),
        }));
      },
      setSelectedNode: (node: Node) =>
        set(({ selectedNode, action, addEdge, removeEdge }) => {
          if (selectedNode && selectedNode !== node) {
            if (action === "add-edge") addEdge(selectedNode, node);
            if (action === "remove-edge") removeEdge(selectedNode, node);
          }
          return { selectedNode: selectedNode ? null : node };
        }),
      addNode: (node: Node) =>
        set({ nodes: [...useGraphStore.getState().nodes, node] }),
      removeNode: (node: Node) => {
        set(({ nodes, edges }) => ({
          nodes: nodes.filter((n) => n.id !== node.id),
          edges: edges.filter(
            (edge) => edge.from.id !== node.id && edge.to.id !== node.id,
          ),
        }));
      },
      setAction: (action: State["action"]) => {
        set({ action: action });
      },
      updateNodePosition: (id: string, x: number, y: number) => {
        set(({ nodes, edges }) => ({
          nodes: nodes.map((node) =>
            node.id === id ? { ...node, x, y } : node,
          ),
          edges: edges.map((edge) => ({
            ...edge,
            from: edge.from.id === id ? { ...edge.from, x, y } : edge.from,
            to: edge.to.id === id ? { ...edge.to, x, y } : edge.to,
          })),
        }));
      },
    }),
    {
      name: "graph-store",
    },
  ),
);
