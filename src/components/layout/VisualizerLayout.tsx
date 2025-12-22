import { useState } from "react";
import {
  algorithmRegistry,
  getAlgorithmsByCategory,
  type AlgorithmId,
} from "@/lib/algorithms/registry";
import { Sidebar } from "@/visualizer/Sidebar";

const groupedAlgorithms = getAlgorithmsByCategory();
const algorithmIds = Object.keys(algorithmRegistry) as AlgorithmId[];
const defaultAlgorithmId = (algorithmIds[0] ?? "bubblesort") as AlgorithmId;

export function VisualizerLayout() {
  const [selectedId, setSelectedId] = useState<AlgorithmId>(defaultAlgorithmId);

  return (
    <div className="bg-background flex h-full">
      <Sidebar
        groupedAlgorithms={groupedAlgorithms}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
