"use client";

import { useMouse } from "@mantine/hooks";
import { useGraphStore } from "@/lib/stores/graph";
import { Node } from "./node";
import { Edge } from "./edge";
import { useEffect, useState } from "react";

export function GraphCanvas() {
  const { x, y } = useMouse();
  const { nodes, edges, action, addNode, updateNodePosition } = useGraphStore();
  const [currentDraggingNode, setCurrentDraggingNode] = useState<
    string | null
  >();

  useEffect(() => {
    if (currentDraggingNode) {
      updateNodePosition(currentDraggingNode, x, y);
    }
  }, [x, y, currentDraggingNode]);

  return (
    <div className="bg-foreground text-background text-opacity-5 rounded-md w-2/3 h-3/4 flex flex-col items-center justify-center">
      <div
        className="w-full h-full z-10 absolute"
        onClick={() => {
          if (action === "add-node") {
            addNode({ id: crypto.randomUUID(), nodeLabel: "A", x, y });
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
              console.log("drag start");
            }}
            dragEnd={() => {
              setCurrentDraggingNode(null);
              console.log("drag end");
            }}
          />
        ))}
      </>
    </div>
  );
}
