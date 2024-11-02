"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlgorithmStore } from "@/lib/stores/algorithm";

export function GraphAlgoSelector() {
  const { setAlgorithm } = useAlgorithmStore();
  return (
    <div>
      <Select
        onValueChange={(value: "" | "flooding" | "distance-vector") => {
          setAlgorithm(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Algorithms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="flooding">Flooding</SelectItem>
          <SelectItem value="distance-vector">Distance Vector</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
