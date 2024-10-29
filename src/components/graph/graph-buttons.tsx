"use client";

import { GraphStore, useGraphStore } from "@/lib/stores/graph";
import { Button } from "../ui/button";
import { AddNodeDialog } from "./add-node-dialog";
import { AddEdgeDialog } from "./add-edge-dialog";

function ActionButton({ action }: { action: GraphStore["action"] }) {
  const { action: currentAction, setAction: setCurrentAction } =
    useGraphStore();

  return (
    <Button
      variant={currentAction === action ? "default" : "outline"}
      onClick={() => setCurrentAction(action)}
    >
      {action.toString().split("-").join(" ")}
    </Button>
  );
}

export function GraphButtons() {
  const actions: GraphStore["action"][] = [
    "view",
    "add-node",
    "remove-node",
    "add-edge",
    "remove-edge",
  ];

  return (
    <div className="flex flex-col justify-center w-2/3 p-4 m-4 gap-4 z-30">
      {actions.map((action) => (
        <ActionButton key={action} action={action} />
      ))}
      <AddNodeDialog />
      <AddEdgeDialog />
    </div>
  );
}
