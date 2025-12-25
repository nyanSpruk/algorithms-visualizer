import type { Node, NodeProps } from "@xyflow/react";

import type { ArrayVisualizationNodeData } from "@/lib/algorithms/shared/array";
import { ArrayValueNode } from "@/components/visualization/ArrayValueNode";

export type ArrayNodeType = Node<ArrayVisualizationNodeData, "arrayNode">;

export function ArrayNode({ data }: NodeProps<ArrayNodeType>) {
  if (!data) return null;

  return (
    <div className="pointer-events-none flex items-end justify-center">
      <ArrayValueNode
        value={data.value}
        index={data.index}
        maxValue={data.maxValue}
        status={data.status}
      />
    </div>
  );
}
