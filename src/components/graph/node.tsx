import { useGraphStore } from "@/lib/stores/graph";
import { useState } from "react";

export function Node({
  id,
  nodeLabel,
  x,
  y,
}: {
  id: string;
  nodeLabel: string;
  x: number;
  y: number;
}) {
  const { action, selectedNode, removeNode, setSelectedNode } = useGraphStore();
  const [, setIsDragging] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (action === "view") {
      setIsDragging(true);
      e.dataTransfer.setData("text/plain", id);
    }
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  return (
    <div
      className="bg-background text-foreground rounded-full w-8 h-8 flex items-center justify-center z-20"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        cursor: action === "view" ? "grab" : "default",
        border: selectedNode?.id === id ? "4px solid green" : "none",
      }}
      draggable={action === "view"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (action === "remove-node") {
          removeNode({ id, nodeLabel, x, y });
        }
        if (action === "add-edge" || action === "remove-edge") {
          setSelectedNode({ id, nodeLabel, x, y });
        }
      }}
    >
      {nodeLabel}
    </div>
  );
}
