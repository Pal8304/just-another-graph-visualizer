"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGraphStore } from "@/lib/stores/graph";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import { useAlgorithmStore } from "@/lib/stores/algorithm";
import { nodesAndEdgesToAdjList } from "@/lib/cn-algorithms/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import assert from "assert";
import { DistanceVector } from "@/lib/cn-algorithms/distance-vector";
import { SkipForwardIcon } from "lucide-react";

export function GraphAlgoComponent() {
  const { isAlgoRunning, setAlgoRunning, setVisitedNodes, setVisitedEdges } =
    useGraphStore();
  const {
    algorithm,
    selectedAlgorithm,
    source,
    setSource,
    destination,
    setDestination,
    instance: algo,
    setInstance: setAlgo,
    setAlgorithm,
  } = useAlgorithmStore();
  const { nodes, edges } = useGraphStore();

  useEffect(() => {
    if (!algorithm && selectedAlgorithm) {
      setAlgorithm(selectedAlgorithm);
    }
    if (algorithm && source && destination && isAlgoRunning) {
      setAlgo(
        new algorithm(
          nodesAndEdgesToAdjList(nodes, edges),
          nodes,
          edges,
          source,
          destination,
          () => {
            setAlgoRunning(false);
            toast.success("Algorithm has finished running");
          },
        ),
      );
    }
  }, [
    algorithm,
    setAlgo,
    isAlgoRunning,
    setAlgoRunning,
    nodes,
    edges,
    source,
    destination,
    setAlgorithm,
    selectedAlgorithm,
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Select
          value={source?.id}
          onValueChange={(sourceId) => {
            setSource(nodes.find((node) => node.id === sourceId)!);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Source Node" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem key={node.id} value={node.id}>
                {node.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={destination?.id}
          onValueChange={(sourceId) => {
            setDestination(nodes.find((node) => node.id === sourceId)!);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Destination Node" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map((node) => (
              <SelectItem key={node.id} value={node.id}>
                {node.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center justify-between">
        {/*<Button
          variant={"ghost"}
          size="icon"
          className="w-12 h-12"
          onClick={() => algo?.previousStep()}
          disabled={!isAlgoRunning}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>*/}
        <Button
          size="icon"
          className="w-12 h-12"
          onClick={() => {
            setVisitedNodes(new Set());
            setVisitedEdges(new Set());
            if (isAlgoRunning) {
              assert(algo !== undefined && algo !== null);
              algo.endAlgorithm();
            }
            setAlgoRunning(!isAlgoRunning);
          }}
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
            setVisitedEdges(algo?.getVisitedEdges() || new Set());
          }}
          disabled={!isAlgoRunning}
        >
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
        {algo instanceof DistanceVector && isAlgoRunning && (
          <Button
            variant={"ghost"}
            size="icon"
            className="w-12 h-12"
            onClick={() => {
              assert(algo instanceof DistanceVector);
              algo.calculateAllDistanceVectors();
              setVisitedNodes(algo?.getVisitedNodes() || new Set());
              setVisitedEdges(algo?.getVisitedEdges() || new Set());
            }}
          >
            <SkipForwardIcon className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
