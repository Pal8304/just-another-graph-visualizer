"use client";

import { GraphStore, useGraphStore } from "@/lib/stores/graph";

export function Node({
  node,
  dragStart,
  dragEnd,
}: {
  node: GraphStore["nodes"][number];
  dragStart: () => void;
  dragEnd: () => void;
}) {
  const { id, nodeLabel, x, y } = node;
  const { action, selectedNode, removeNode, setSelectedNode } = useGraphStore();

  return (
    <div
      className="bg-background text-foreground rounded-full w-8 h-8 flex items-center justify-center z-20 absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        cursor: action === "view" ? "grab" : "default",
        border: selectedNode?.id === id ? "4px solid green" : "none",
      }}
      onMouseDown={() => {
        if (action === "view") dragStart();
      }}
      onMouseUp={() => {
        if (action === "view") dragEnd();
      }}
      onClick={() => {
        if (action === "remove-node") {
          removeNode({ id, nodeLabel, x, y }); // Update to use live position
        }
        if (action === "add-edge" || action === "remove-edge") {
          setSelectedNode({ id, nodeLabel, x, y }); // Update to use live position
        }
      }}
    >
      {nodeLabel}
    </div>
  );
}
