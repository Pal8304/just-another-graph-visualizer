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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function GraphAlgoComponent() {
  const { isAlgoRunning, setAlgoRunning, setVisitedNodes } = useGraphStore();
  const { algorithm, source, setSource, destination, setDestination } = useAlgorithmStore();
  const [algo, setAlgo] = useState<GraphAlgorithm>();
  const { nodes, edges } = useGraphStore();

  useEffect(() => {
    if (algorithm && source && destination) {
      setAlgo(
        new algorithm(nodesAndEdgesToAdjList(nodes, edges), source, destination),
      );
    }
  }, [algorithm, setAlgo, nodes, edges, source, destination]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Select value={source?.id} onValueChange={(sourceId) => {
          setSource(nodes.find((node) => node.id === sourceId)!);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Source Node" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem
                key={node.id}
                value={node.id}
              >
                {node.nodeLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={destination?.id} onValueChange={(sourceId) => {
          setDestination(nodes.find((node) => node.id === sourceId)!);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Destination Node" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem
                key={node.id}
                value={node.id}
              >
                {node.nodeLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button
          variant={"ghost"}
          size="icon"
          className="w-12 h-12"
          onClick={() => algo?.previousStep()}
          disabled={!isAlgoRunning}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          className="w-12 h-12"
          onClick={() => setAlgoRunning(!isAlgoRunning)}
          disabled={!algo || !source || !destination}
        >
          {!isAlgoRunning ? (
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
          disabled={!isAlgoRunning}
        >
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
