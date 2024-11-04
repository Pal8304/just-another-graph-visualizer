import { GraphCanvas } from "@/components/graph/view/canvas";
import { GraphButtons } from "@/components/graph/view/actions";
import { GraphAlgoComponent } from "@/components/graph/algo/controls";
import { GraphAlgoSelector } from "@/components/graph/algo/selector";

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
        <div>
          <GraphAlgoSelector />
          <GraphAlgoComponent />
        </div>
      </div>
    </div>
  );
}
