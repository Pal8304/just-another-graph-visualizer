import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlgorithmStore } from "@/lib/stores/algorithm";

export function GraphAlgoSelector() {
  const { setSelectedAlgorithm } = useAlgorithmStore();
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Algorithms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="flooding"
            onSelect={() => {
              setSelectedAlgorithm("flooding");
            }}
          >
            Flooding
          </SelectItem>
          <SelectItem
            value="distance-vector"
            onSelect={() => {
              setSelectedAlgorithm("distance-vector");
            }}
          >
            Distance Vector
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
