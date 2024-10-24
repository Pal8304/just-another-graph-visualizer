export function Node({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <div
      className="bg-background text-foreground rounded-full w-8 h-8 flex items-center justify-center"
      style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {id}
    </div>
  );
}
