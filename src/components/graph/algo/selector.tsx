"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlgorithmStore, useAlgorithmStore } from "@/lib/stores/algorithm";

export function GraphAlgoSelector() {
  const { setAlgorithm, selectedAlgorithm } = useAlgorithmStore();
  console.log(selectedAlgorithm);
  return (
    <div>
      <Select
        onValueChange={(value: AlgorithmStore["selectedAlgorithm"]) => {
          console.log("changing value", value);
          setAlgorithm(value);
        }}
        value={selectedAlgorithm}
        defaultValue={selectedAlgorithm}
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
