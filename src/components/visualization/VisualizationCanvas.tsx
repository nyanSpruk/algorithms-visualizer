import type { ArrayNodeState } from "@/lib/algorithms/shared/array";
import { ArrayValueNode } from "@/components/visualization/ArrayValueNode";

type VisualizationCanvasProps = {
  nodes: ArrayNodeState[];
};

export function VisualizationCanvas({ nodes }: VisualizationCanvasProps) {
  if (!nodes.length) {
    return (
      <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm">
        <p>No data to visualize yet.</p>
        <p className="text-xs">
          Vizualization needs to be implemented for the selected algorithm.
        </p>
      </div>
    );
  }

  const maxValue = nodes.reduce(
    (currentMax, node) => Math.max(currentMax, Math.abs(node.value)),
    0,
  );

  return (
    <div className="flex h-full w-full items-end justify-center gap-4 overflow-x-auto px-6 py-8">
      {nodes.map((node, index) => (
        <ArrayValueNode
          key={`${index}-${node.value}-${node.status ?? "default"}`}
          value={node.value}
          index={index}
          maxValue={maxValue}
          status={node.status ?? "default"}
        />
      ))}
    </div>
  );
}
