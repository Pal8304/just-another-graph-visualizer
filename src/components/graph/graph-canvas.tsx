"use client";
import { useMouse } from "@mantine/hooks";
import { useGraphStore } from "@/lib/stores/graph";
import { Node } from "./node";

export function GraphCanvas() {
  const { ref, x, y } = useMouse();
  const { nodes, edges, action, addNode, updateNodePosition } = useGraphStore();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      updateNodePosition(id, newX, newY);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      ref={ref}
      className="bg-foreground text-background text-opacity-5 rounded-md w-2/3 h-3/4 flex flex-col items-center justify-center relative"
    >
      <div
        className="w-full h-full z-10 absolute"
        onClick={() => {
          if (action === "add-node") {
            addNode({ id: crypto.randomUUID(), nodeLabel: "A", x, y });
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      ></div>
      <svg className="w-full h-full absolute">
        {edges.map((edge, index) => (
          <g key={index}>
            <line
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              className="stroke-current"
            />
            <text
              className="text-lg fill-current"
              x={(edge.from.x + edge.to.x) / 2}
              y={(edge.from.y + edge.to.y) / 2}
              dx={0}
              dy={0}
              textAnchor="middle"
            >
              {edge.weight}
            </text>
          </g>
        ))}
      </svg>
      <>
        {nodes.map((node) => (
          <Node key={node.id} {...node} />
        ))}
      </>
    </div>
  );
}
