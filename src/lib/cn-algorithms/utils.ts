import { GraphEdge, GraphNode } from "../stores/graph";
export type AdjList = Map<string, Array<[GraphNode, number]>>;

export function nodesAndEdgesToAdjList(
  nodes: GraphNode[],
  edges: GraphEdge[],
): AdjList {
  const adjList: AdjList = new Map();

  for (const node of nodes) {
    adjList.set(node.id, []);
  }

  for (const edge of edges) {
    if (edge.directed) {
      adjList.get(edge.from.id)!.push([edge.to, edge.weight]);
    } else {
      console.log("sus", adjList.get(edge.from.id));
      adjList.get(edge.from.id)!.push([edge.to, edge.weight]);
      adjList.get(edge.to.id)!.push([edge.from, edge.weight]);
    }
  }

  return adjList;
}
