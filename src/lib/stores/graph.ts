import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GraphNode {
  id: string;
  nodeLabel: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  directed: boolean;
  from: GraphNode;
  to: GraphNode;
  weight: number;
}

interface State {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  nodeToAdd: GraphNode | null;
  edgeToAdd: GraphEdge | null;
  action: "view" | "add-node" | "remove-node" | "add-edge" | "remove-edge";
  isAlgoRunning: boolean;
}

interface Actions {
  addNode: (node: GraphNode) => void;
  removeNode: (node: GraphNode) => void;
  addEdge: (edge: GraphEdge) => void;
  removeEdge: (from: GraphNode, to: GraphNode) => void;
  setNodeToAdd: (node: GraphNode) => void;
  setEdgeToAdd: (edge: GraphEdge | null) => void;
  setSelectedNode: (node: GraphNode) => void;
  setAction: (action: State["action"]) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  setAlgoRunning: (running: boolean) => void;
}

export type GraphStore = State & Actions;

export const useGraphStore = create(
  persist<GraphStore>(
    (set) => ({
      nodes: [],
      edges: [],
      action: "view",
      selectedNode: null,
      nodeToAdd: null,
      edgeToAdd: null,
      isAlgoRunning: false,
      addEdge: (edge: GraphEdge) => {
        set(({ edges }) => ({
          edges: [...edges, edge],
        }));
      },
      removeEdge: (from: GraphNode, to: GraphNode) => {
        // might have to change this to removeEdge: (edge: Edge) cause of multiple edges
        set(({ edges }) => ({
          edges: edges.filter(
            (edge) => edge.from.id !== from.id || edge.to.id !== to.id,
          ),
        }));
      },
      setNodeToAdd: (node: GraphNode) => set({ nodeToAdd: node }),
      setEdgeToAdd: (edge: GraphEdge | null) => set({ edgeToAdd: edge }),
      setSelectedNode: (node: GraphNode) =>
        set(({ selectedNode, action, setEdgeToAdd, removeEdge }) => {
          console.log(selectedNode, node);
          if (selectedNode && selectedNode !== node) {
            console.log("Not the same node");
            if (action === "add-edge")
              setEdgeToAdd({
                directed: false,
                from: selectedNode,
                to: node,
                weight: 100,
              });
            if (action === "remove-edge") removeEdge(selectedNode, node);
          }
          if (selectedNode === node) {
            return { selectedNode: null };
          }
          return { selectedNode: selectedNode ? null : node };
        }),
      addNode: (node: GraphNode) =>
        set({ nodes: [...useGraphStore.getState().nodes, node] }),
      removeNode: (node: GraphNode) => {
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
      setAlgoRunning: (running: boolean) => {
        set({ isAlgoRunning: running });
      },
    }),
    {
      name: "graph-store",
    },
  ),
);
