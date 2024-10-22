import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4">
        Canvas type something here
        <div className="flex flex-row justify-center w-2/3 p-4 m-4 gap-4">
          <Button>
            Add Node
          </Button>
          <Button>
            Add Edge
          </Button>
          <Button>
            Run Algorithm
          </Button>
        </div>
      </div>
    </div>
  );
}
