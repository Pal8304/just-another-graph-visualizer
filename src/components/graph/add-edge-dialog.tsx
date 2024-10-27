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
import { Checkbox } from "../ui/checkbox";

export function AddEdgeDialog() {
  const { edgeToAdd, addEdge, setEdgeToAdd } = useGraphStore();
  const [open, setOpen] = useState(edgeToAdd !== null);
  const [weight, setWeight] = useState(0);
  const [directed, setDirected] = useState(false);
  useEffect(() => {
    setOpen(edgeToAdd !== null);
  }, [edgeToAdd]);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setEdgeToAdd(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add edge</DialogTitle>
          <DialogDescription>Add a new edge to the graph</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Edge Weight
            </Label>
            <Input
              id="node"
              className="col-span-3"
              type="number"
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
            <Label className="text-right">Directed</Label>
            <Checkbox id="directed" onChange={() => setDirected(!directed)} />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (edgeToAdd) {
                edgeToAdd.weight = weight;
                edgeToAdd.directed = directed;
                addEdge(edgeToAdd);
                setEdgeToAdd(null);
              }
              setOpen(false);
            }}
          >
            Add Edge
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
                setEdgeToAdd(null);
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
