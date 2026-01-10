import type { Node, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";

import type {
  QueueNodeStatus,
  QueueVisualizationNodeData,
} from "@/lib/algorithms/shared/queue";
import { cn } from "@/lib/utils";

export type QueueNodeType = Node<QueueVisualizationNodeData, "queueNode">;

const statusStyles: Record<QueueNodeStatus, string> = {
  default: "bg-slate-50 border-slate-300 text-slate-900 shadow-sm",
  current: "bg-sky-100 border-sky-400 text-sky-900 shadow-sky-200/70",
  checked: "bg-slate-100 border-slate-300 text-slate-600",
  found: "bg-emerald-100 border-emerald-400 text-emerald-900",
  new: "bg-blue-100 border-blue-400 text-blue-900",
  removed: "bg-red-100 border-red-400 text-red-900 opacity-80",
};

const spring = { type: "spring" as const, stiffness: 220, damping: 26 };

export function QueueNode({ data }: NodeProps<QueueNodeType>) {
  if (!data) return null;

  const status = data.status ?? "default";

  return (
    <motion.div
      layout="position"
      initial={{ opacity: status === "new" ? 0 : 1, x: status === "new" ? 20 : 0 }}
      animate={{ opacity: status === "removed" ? 0.2 : 1, x: 0 }}
      transition={spring}
      className={cn(
        "relative flex h-20 w-20 items-center justify-center rounded-lg border-2 text-center",
        statusStyles[status],
      )}
    >
      {data.label ? (
        <span className="text-muted-foreground absolute left-1 top-1 text-[0.6rem] font-semibold uppercase tracking-wide">
          {data.label}
        </span>
      ) : null}
      <p className="text-3xl font-black">{data.value}</p>
    </motion.div>
  );
}
