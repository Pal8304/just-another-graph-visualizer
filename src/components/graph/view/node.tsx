"use client";

import { GraphStore, useGraphStore } from "@/lib/stores/graph";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useAlgorithmStore } from "@/lib/stores/algorithm";
import { DistanceVector } from "@/lib/cn-algorithms/distance-vector";
import { Flooding } from "@/lib/cn-algorithms/flooding";

export function Node({
  node,
  dragStart,
  dragEnd,
}: {
  node: GraphStore["nodes"][number];
  dragStart: () => void;
  dragEnd: () => void;
}) {
  const { id, label: nodeLabel, x, y } = node;
  const {
    action,
    selectedNode,
    nodes,
    removeNode,
    setSelectedNode,
    visitedNodes,
    isAlgoRunning,
  } = useGraphStore();
  const { selectedAlgorithm, instance } = useAlgorithmStore();
  let distanceVectors: DistanceVector["distanceVector"] = new Map();
  let parentMap: Flooding["parentMap"] = new Map();
  if (instance instanceof DistanceVector) {
    distanceVectors = instance.distanceVector;
  }
  if (instance instanceof Flooding) {
    parentMap = instance.getParentMap();
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="text-foreground rounded-full w-8 h-8 flex items-center justify-center z-20 absolute"
          style={{
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            cursor: isAlgoRunning
              ? "not-allowed"
              : action === "view"
              ? "grab"
              : "default",
            border: selectedNode?.id === id ? "4px solid green" : "none",
            backgroundColor: visitedNodes.includes(id) ? "green" : "background",
          }}
          onMouseDown={() => {
            if (action === "view" && !isAlgoRunning) dragStart();
          }}
          onMouseUp={() => {
            if (action === "view" && !isAlgoRunning) dragEnd();
          }}
          onClick={() => {
            if (action === "remove-node") {
              removeNode({ id, label: nodeLabel, x, y }); // Update to use live position
            }
            if (action === "add-edge" || action === "remove-edge") {
              setSelectedNode({ id, label: nodeLabel, x, y }); // Update to use live position
            }
          }}
          onDoubleClick={() => {
            // function to change the node label
          }}
        >
          {nodeLabel}
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        {selectedAlgorithm === "flooding" ? (
          <div>
            Parent:{" "}
            {nodes.find((n) => n.id === parentMap.get(node.id))?.label || "-"}
          </div>
        ) : selectedAlgorithm === "distance-vector" ? (
          <div>
            {distanceVectors.has(id) ? (
              <div>
                {Array.from(distanceVectors.get(id)!.entries()).map(
                  ([nodeId, distance]) => (
                    <div key={nodeId}>
                      {nodes.find((node) => node.id === nodeId)?.label}:{" "}
                      {distance[0]} via{" "}
                      {nodes.find((node) => node.id === distance[1])?.label ||
                        "-"}
                    </div>
                  )
                )}
              </div>
            ) : (
              <>No info available</>
            )}
          </div>
        ) : (
          <div>
            <div>Node ID: {id}</div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
