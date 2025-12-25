import { MarkerType } from "@xyflow/react";

import type { VisualizationState } from "lib/algorithms/types";
import type { LinkedListVisualizationNodeData } from "lib/algorithms/shared/linked-list";
import type { LinkedListInput } from "./types";

const NODE_SPACING = 180;

function buildLinkedListNodes(
  input: LinkedListInput,
): LinkedListVisualizationNodeData[] {
  return input.values.map<LinkedListVisualizationNodeData>(
    (value, index, array) => {
      const id = `node-${index}-${value}`;
      const status =
        typeof input.target === "number" && input.target === value
          ? "found"
          : index === 0
            ? "current"
            : "default";

      return {
        id,
        value,
        index,
        orientation: "horizontal",
        status,
        label:
          index === 0
            ? "HEAD"
            : index === array.length - 1
              ? "TAIL"
              : undefined,
      };
    },
  );
}

export function buildLinkedListVisualization(
  input: LinkedListInput,
): VisualizationState {
  const nodes = buildLinkedListNodes(input).map((node) => ({
    id: node.id,
    type: "listNode" as const,
    position: { x: node.index * NODE_SPACING, y: 0 },
    data: node,
  }));

  const edges =
    nodes.length > 1
      ? nodes.slice(0, -1).map((node, index) => ({
          id: `edge-${node.id}-${nodes[index + 1].id}`,
          source: node.id,
          target: nodes[index + 1].id,
          type: "smoothstep" as const,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#535050",
          },
          style: {
            strokeWidth: 2,
            stroke: "#535050",
          },
        }))
      : [];

  return { nodes, edges };
}
