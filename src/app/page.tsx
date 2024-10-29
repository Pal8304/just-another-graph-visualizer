import { GraphCanvas } from "@/components/graph/graph-canvas";
import { GraphButtons } from "@/components/graph/graph-buttons";
import { GraphAlgoSelector } from "@/components/graph/graph-algo-dropdown";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row justify-between">
      <div className="w-1/4 h-full flex flex-col items-center justify-center">
        <GraphButtons />
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <GraphCanvas />
      </div>
      <div className="w-1/4 h-full flex flex-col items-center justify-center">
        <GraphAlgoSelector />
      </div>
    </div>
  );
}
