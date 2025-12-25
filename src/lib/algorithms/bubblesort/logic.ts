import type { VisualizationState } from "lib/algorithms/types";

import type { BubbleSortInput } from "./types";

const NODE_HORIZONTAL_SPACING = 140;

export function buildBubbleSortVisualization(
  input: BubbleSortInput,
): VisualizationState {
  if (!input.length) {
    return { nodes: [], edges: [] };
  }

  const maxValue = input.reduce(
    (max, value) => Math.max(max, Math.abs(value)),
    0,
  );

  const nodes = input.map((value, index) => ({
    id: `array-node-${index}-${value}`,
    type: "arrayNode" as const,
    position: { x: index * NODE_HORIZONTAL_SPACING, y: 0 },
    data: {
      value,
      status: "default" as const,
      index,
      maxValue: maxValue === 0 ? 1 : maxValue,
    },
  }));

  return { nodes, edges: [] };
}
