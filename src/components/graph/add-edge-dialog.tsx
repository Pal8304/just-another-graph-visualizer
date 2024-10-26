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

import { useGraphStore } from "@/lib/stores/graph";

export function AddEdgeDialog() {
  const { action, setAction } = useGraphStore();
  return (
    <Dialog
      open={action === "add-edge"}
      onOpenChange={() => {
        setAction("view");
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add edge</DialogTitle>
          <DialogDescription>Add a new edge to the graph</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="from" className="text-right">
              From
            </Label>
            <Input id="from" value="A" className="col-span-3" />
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input id="to" value="B" className="col-span-3" />
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <Input id="weight" value="1" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add edge</Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAction("view")}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
