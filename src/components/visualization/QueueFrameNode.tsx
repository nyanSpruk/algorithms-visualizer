import type { Node, NodeProps } from "@xyflow/react";

import type { QueueFrameNodeData } from "@/lib/algorithms/shared/queue";

export type QueueFrameNodeType = Node<QueueFrameNodeData, "queueFrame">;

export function QueueFrameNode({ data }: NodeProps<QueueFrameNodeType>) {
  if (!data) return null;

  return (
    <div
      className="pointer-events-none rounded-2xl border-2 border-muted-foreground/40 bg-muted/10"
      style={{ width: data.width, height: data.height }}
    />
  );
}
