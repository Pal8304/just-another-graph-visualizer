"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGraphStore } from "@/lib/stores/graph";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import { GraphAlgorithm } from "@/lib/cn-algorithms/graph-algorithm";
import { useAlgorithmStore } from "@/lib/stores/algorithm";
import { nodesAndEdgesToAdjList } from "@/lib/cn-algorithms/utils";

export function GraphAlgoComponent() {
  const { isAlgoRunning, setAlgoRunning, setVisitedNodes } = useGraphStore();
  const { algorithm } = useAlgorithmStore();
  const [algo, setAlgo] = useState<GraphAlgorithm>();
  const { nodes, edges } = useGraphStore();

  useEffect(() => {
    if (algorithm) {
      setAlgo(
        new algorithm(nodesAndEdgesToAdjList(nodes, edges), nodes[0], nodes[1]),
      );
    }
  }, [algorithm, setAlgo, nodes, edges]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center justify-between">
        <Button
          variant={"ghost"}
          size="icon"
          className="w-12 h-12"
          onClick={() => algo?.previousStep()}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          className="w-12 h-12"
          onClick={() => setAlgoRunning(!isAlgoRunning)}
          disabled={!algo}
        >
          {isAlgoRunning ? (
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
            algo?.nextStep();
            setVisitedNodes(algo?.getVisitedNodes() || new Set());
          }}
        >
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
