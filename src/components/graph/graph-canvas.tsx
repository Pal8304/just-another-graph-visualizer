"use client";
import { useMouse } from "@mantine/hooks";
import { useGraphStore } from "@/lib/stores/graph";
import { Node } from "./node";

export function GraphCanvas() {
  const { ref, x, y } = useMouse();
  const { action, addNode } = useGraphStore();
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
      ></div>
      <>
        {useGraphStore().nodes.map((node) => (
          <Node key={node.id} {...node} />
        ))}
      </>
    </div>
  );
}
