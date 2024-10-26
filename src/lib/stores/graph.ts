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

export const useGraphStore = create<GraphStore, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      action: "view",
      selectedNode: null,
      addEdge: (from: Node, to: Node) => {
        set({
          edges: [
            ...useGraphStore.getState().edges,
            { directed: false, from, to, weight: 100 },
          ],
        });
        console.log("Added edge", from, to);
      },
      removeEdge: (from: Node, to: Node) => {
        // might have to change this to removeEdge: (edge: Edge) cause of multiple edges
        set({
          edges: useGraphStore.getState().edges.filter((edge) => {
            return edge.from.id !== from.id || edge.to.id !== to.id;
          }),
        });
        console.log("Remove edge", from, to);
      },
      setSelectedNode: (node: Node) => {
        const selectedNode = useGraphStore.getState().selectedNode;
        if (selectedNode === node) {
          set({ selectedNode: null });
        } else if (selectedNode) {
          if (useGraphStore.getState().action === "add-edge") {
            useGraphStore.getState().addEdge(selectedNode, node);
          }
          if (useGraphStore.getState().action === "remove-edge") {
            useGraphStore.getState().removeEdge(selectedNode, node);
          }
          set({ selectedNode: null });
        } else {
          set({ selectedNode: node });
        }
      },
      addNode: (node: Node) => {
        set({ nodes: [...useGraphStore.getState().nodes, node] });
        console.log("Added node", node);
      },
      removeNode: (node: Node) => {
        set({
          nodes: useGraphStore.getState().nodes.filter((n) => n.id !== node.id),
        });
        set({
          edges: useGraphStore
            .getState()
            .edges.filter(
              (edge) => edge.from.id !== node.id && edge.to.id !== node.id
            ),
        });
        console.log("Removed node", node);
      },
      setAction: (action: State["action"]) => {
        set({ action: action });
      },
      updateNodePosition: (id: string, x: number, y: number) => {
        set({
          nodes: useGraphStore
            .getState()
            .nodes.map((node) => (node.id === id ? { ...node, x, y } : node)),
        });
        set({
          edges: useGraphStore.getState().edges.map((edge) => {
            if (edge.from.id === id) {
              return { ...edge, from: { ...edge.from, x, y } };
            }
            if (edge.to.id === id) {
              return { ...edge, to: { ...edge.to, x, y } };
            }
            return edge;
          }),
        });
      },
    }),
    {
      name: "graph-store",
    }
  )
);
