"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { GraphAlgoSelector } from "./graph-algo-selector";
import { useGraphStore } from "@/lib/stores/graph";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import Flooding from "@/lib/cn-algorithms/flooding";
export function GraphAlgoComponent() {
  const { isGraphAlgorithmRunning, setIsGraphAlgorithmRunning } =
    useGraphStore();
  const [floodingInstance, setFloodingInstance] = useState<Flooding | null>(
    null
  );
  const { nodes, edges } = useGraphStore();
  const constructGraph = () => {
    const graph: Map<
      { node: string },
      { adjacentNodes: [node: string, weight: number][] }
    > = new Map();
    for (const node of nodes) {
      graph.set({ node: node.id }, { adjacentNodes: [] });
    }
    console.log(graph);
    for (const edge of edges) {
      const from = edge.from.id;
      const to = edge.to.id;
      let weight = edge.weight;
      const directed = edge.directed;
      if (weight === null || weight === undefined) {
        weight = 1;
      }
      if (!directed) {
        console.log("Before graph", graph);
        const toNodeData: [node: string, weight: number] = [to, weight];
        graph.get({ node: from })!.adjacentNodes.push(toNodeData);
        const fromNodeData: [node: string, weight: number] = [from, weight];
        graph.get({ node: to })!.adjacentNodes.push(fromNodeData);
        console.log("After graph", graph);
      } else {
        graph.get({ node: from })!.adjacentNodes.push([to, weight]);
      }
    }
    console.log("Nodes ", nodes);
    console.log("Edges", edges);
    console.log("Constructed graph", graph);
    return graph;
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <GraphAlgoSelector />
      <div className="flex flex-row items-center justify-between">
        <Button
          variant={"ghost"}
          size="icon"
          className="w-12 h-12"
          onClick={() => {
            floodingInstance?.previousStep();
          }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          className="w-12 h-12"
          onClick={() => {
            setIsGraphAlgorithmRunning(!isGraphAlgorithmRunning);
            if (isGraphAlgorithmRunning) {
              console.log("Starting Flooding");
              setFloodingInstance(
                new Flooding(
                  constructGraph(),
                  nodes[0].id,
                  nodes[nodes.length - 1].id
                )
              );
            }
          }}
        >
          {isGraphAlgorithmRunning ? (
            <PlayIcon className="w-6 h-6" />
          ) : (
            <StopIcon className="w-6 h-6" />
          )}
        </Button>
        <Button
          variant={"ghost"}
          size="icon"
          className="w-12 h-12"
          onClick={() => {
            console.log("Next step");
            floodingInstance?.nextStep();
          }}
        >
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
