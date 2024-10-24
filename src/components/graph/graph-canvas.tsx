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
            addNode({ id: "A", x: x, y: y });
          }
        }}
      ></div>
      <div className="w-full h-full z-0 absolute">
        {useGraphStore().nodes.map((node) => (
          <Node key={crypto.randomUUID()} {...node} />
        ))}
      </div>
    </div>
  );
}
