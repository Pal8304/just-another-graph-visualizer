import GraphCanvas from "@/components/graph/graph-canvas";
import GraphButtons from "@/components/graph/graph-buttons";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="h-full flex flex-col items-center justify-center p-4">
        <GraphCanvas />
        <GraphButtons />
      </div>
    </div>
  );
}
