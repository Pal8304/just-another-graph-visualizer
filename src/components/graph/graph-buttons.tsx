import { Button } from "../ui/button";

export default function GraphButtons() {
  return (
    <div className="flex flex-row justify-center w-2/3 p-4 m-4 gap-4">
      <Button>Add Node</Button>
      <Button>Add Edge</Button>
      <Button>Run Algorithm</Button>
    </div>
  );
}
