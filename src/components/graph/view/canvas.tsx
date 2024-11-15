"use client";

import { useMouse } from "@mantine/hooks";
import { useGraphStore } from "@/lib/stores/graph";
import { Node } from "./node";
import { Edge } from "./edge";
import { useEffect, useState } from "react";

export function GraphCanvas() {
  const { ref, x, y } = useMouse();
  const {
    nodes,
    edges,
    action,
    nodeToAdd,
    addNode,
    updateNodePosition,
    setAction,
    isAlgoRunning,
  } = useGraphStore();
  const [currentDraggingNode, setCurrentDraggingNode] = useState<
    string | null
  >();

  useEffect(() => {
    if (currentDraggingNode && !isAlgoRunning) {
      updateNodePosition(currentDraggingNode, x, y);
    }
  }, [x, y, currentDraggingNode, updateNodePosition, isAlgoRunning]);

  return (
    <div
      className="bg-foreground text-background text-opacity-5 rounded-md w-full h-full flex flex-col items-center justify-center relative"
      ref={ref}
    >
      <div
        className="w-full h-full z-10 absolute"
        onClick={() => {
          if (action === "add-node") {
            addNode({
              id: nodeToAdd?.id || "",
              label: nodeToAdd?.label || "A",
              x: x,
              y: y,
            });
            setAction("view");
          }
        }}
      ></div>
      <svg className="w-full h-full absolute">
        {edges.map((edge, index) => (
          <Edge key={index} edge={edge} />
        ))}
      </svg>
      <>
        {nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            dragStart={() => {
              setCurrentDraggingNode(node.id);
            }}
            dragEnd={() => {
              setCurrentDraggingNode(null);
            }}
          />
        ))}
      </>
    </div>
  );
}
