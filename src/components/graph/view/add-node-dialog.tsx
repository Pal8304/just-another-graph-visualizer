"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { useGraphStore } from "@/lib/stores/graph";

export function AddNodeDialog() {
  const { action, setNodeToAdd, setAction, isAlgoRunning } = useGraphStore();
  const [open, setOpen] = useState(action === "add-node");
  const [nodeLabel, setNodeLabel] = useState("A");
  useEffect(() => {
    setOpen(action === "add-node");
  }, [action]);
  return (
    <Dialog
      open={open && !isAlgoRunning}
      onOpenChange={() => {
        setOpen(false);
        setAction("view");
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add node</DialogTitle>
          <DialogDescription>Add a new node to the graph</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Node Label
            </Label>
            <Input
              id="node"
              className="col-span-3"
              onChange={(e) => setNodeLabel(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setNodeToAdd({
                id: crypto.randomUUID(),
                label: nodeLabel,
                x: 0,
                y: 0,
              });
              setOpen(false);
            }}
          >
            Add node
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
                setAction("view");
              }}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
