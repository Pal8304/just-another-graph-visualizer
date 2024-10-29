import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GraphAlgoSelector() {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Algorithms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dijkstra">Dijkstra</SelectItem>
          <SelectItem value="bellman-ford">Bellman Ford</SelectItem>
          <SelectItem value="floyd-warshall">Floyd Warshall</SelectItem>
          <SelectItem value="prim">Prim</SelectItem>
          <SelectItem value="kruskal">Kruskal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
