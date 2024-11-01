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
  nodeToAdd: Node | null;
  edgeToAdd: Edge | null;
  action: "view" | "add-node" | "remove-node" | "add-edge" | "remove-edge";
  isGraphAlgorithmRunning: boolean;
}

interface Actions {
  addNode: (node: Node) => void;
  removeNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (from: Node, to: Node) => void;
  setNodeToAdd: (node: Node) => void;
  setEdgeToAdd: (edge: Edge | null) => void;
  setSelectedNode: (node: Node) => void;
  setAction: (action: State["action"]) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  setIsGraphAlgorithmRunning: (running: boolean) => void;
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
      isGraphAlgorithmRunning: false,
      addEdge: (edge: Edge) => {
        set(({ edges }) => ({
          edges: [...edges, edge],
        }));
      },
      removeEdge: (from: Node, to: Node) => {
        // might have to change this to removeEdge: (edge: Edge) cause of multiple edges
        set(({ edges }) => ({
          edges: edges.filter(
            (edge) => edge.from.id !== from.id || edge.to.id !== to.id
          ),
        }));
      },
      setNodeToAdd: (node: Node) => set({ nodeToAdd: node }),
      setEdgeToAdd: (edge: Edge | null) => set({ edgeToAdd: edge }),
      setSelectedNode: (node: Node) =>
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
      addNode: (node: Node) =>
        set({ nodes: [...useGraphStore.getState().nodes, node] }),
      removeNode: (node: Node) => {
        set(({ nodes, edges }) => ({
          nodes: nodes.filter((n) => n.id !== node.id),
          edges: edges.filter(
            (edge) => edge.from.id !== node.id && edge.to.id !== node.id
          ),
        }));
      },
      setAction: (action: State["action"]) => {
        set({ action: action });
      },
      updateNodePosition: (id: string, x: number, y: number) => {
        set(({ nodes, edges }) => ({
          nodes: nodes.map((node) =>
            node.id === id ? { ...node, x, y } : node
          ),
          edges: edges.map((edge) => ({
            ...edge,
            from: edge.from.id === id ? { ...edge.from, x, y } : edge.from,
            to: edge.to.id === id ? { ...edge.to, x, y } : edge.to,
          })),
        }));
      },
      setIsGraphAlgorithmRunning: (running: boolean) => {
        set({ isGraphAlgorithmRunning: running });
      },
    }),
    {
      name: "graph-store",
    }
  )
);
