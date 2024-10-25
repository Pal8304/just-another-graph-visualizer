import { useGraphStore } from "@/lib/stores/graph";

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
  const { action, removeNode } = useGraphStore();
  return (
    <div
      className="bg-background text-foreground rounded-full w-8 h-8 flex items-center justify-center z-20"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => {
        if (action === "remove-node") {
          removeNode({ id: id, nodeLabel: nodeLabel, x: x, y: y });
        }
      }}
    >
      {nodeLabel}
    </div>
  );
}
