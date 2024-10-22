import { ThemeToggle } from "./theme/toggle";

export default function Navbar() {
  return (
    <div className="font-sans flex flex-row w-full justify-between">
      <div className="flex items-center p-4">
        <div className="text-xl font-bold">Just Another Graph Visualizer</div>
      </div>
      <div className="p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}