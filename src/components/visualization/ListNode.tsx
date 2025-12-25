import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";

import type {
  LinkedListNodeStatus,
  LinkedListVisualizationNodeData,
  ListNodeVariant,
} from "@/lib/algorithms/shared/linked-list";
import { cn } from "@/lib/utils";

export type ListNodeType = Node<LinkedListVisualizationNodeData, "listNode">;

const statusStyles: Record<LinkedListNodeStatus, string> = {
  default: "bg-card border border-border text-foreground",
  current:
    "bg-sky-100 text-sky-900 border-sky-400 shadow-sky-200/70 dark:bg-sky-500/20 dark:text-sky-100",
  checked:
    "bg-muted text-muted-foreground border-muted-foreground/40 dark:bg-muted/40",
  found:
    "bg-emerald-100 text-emerald-900 border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-100",
  new: "bg-blue-100 text-blue-900 border-blue-400 dark:bg-blue-500/20 dark:text-blue-100",
  removed:
    "bg-red-100 text-red-900 border-red-400 dark:bg-red-500/20 dark:text-red-100 opacity-80",
};

const stackStatusStyles: Record<LinkedListNodeStatus, string> = {
  default: "bg-white border border-slate-200 text-slate-900",
  current: "bg-sky-50 border-sky-300 text-sky-900 shadow-lg shadow-sky-100/80",
  checked:
    "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800/40 dark:text-slate-100",
  found:
    "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-lg shadow-emerald-100/70",
  new: "bg-blue-50 border-blue-200 text-blue-900 shadow-lg shadow-blue-100/90",
  removed:
    "bg-red-50 border-red-200 text-red-800 opacity-90 dark:bg-red-500/20 dark:text-red-100",
};

const spring = { type: "spring" as const, stiffness: 220, damping: 26 };
const defaultHandleStyles = {
  width: 6,
  height: 6,
  background: "hsl(var(--border))",
};
const invisibleHandleStyles = {
  width: 6,
  height: 6,
  background: "transparent",
  border: "none",
  opacity: 0,
};

export function ListNode({ data }: NodeProps<ListNodeType>) {
  if (!data) return null;

  const showHandles = data.showHandles ?? true;
  const orientation = data.orientation ?? "horizontal";
  const variant: ListNodeVariant = data.variant ?? "default";
  const extraHandles = data.handles ?? [];
  const handleStyle =
    variant === "stack" ? defaultHandleStyles : invisibleHandleStyles;

  const initial = getInitialMotion(data.status, orientation);
  const animate = getAnimateMotion(data.status, orientation);

  function getInitialMotion(
    status: LinkedListNodeStatus,
    orientation: "vertical" | "horizontal",
  ) {
    if (status !== "new") {
      return { opacity: 1, x: 0, y: 0 };
    }

    if (orientation === "vertical") {
      return { opacity: 0, y: 40 };
    }

    return { opacity: 0, x: 40 };
  }

  function getAnimateMotion(
    status: LinkedListNodeStatus,
    orientation: "vertical" | "horizontal",
  ) {
    if (status === "removed") {
      if (orientation === "vertical") {
        return { opacity: 0.2, y: -40 };
      }

      return { opacity: 0.2, x: -40 };
    }

    return { opacity: 1, x: 0, y: 0 };
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-muted-foreground flex h-4 items-center justify-center text-center text-[0.65rem] font-semibold tracking-wide uppercase">
        {data.label ?? ""}
      </div>
      <motion.div
        layout="position"
        initial={initial}
        animate={animate}
        transition={spring}
        className={cn(
          "relative text-center",
          variant === "stack"
            ? "flex h-full w-full flex-col items-center justify-center rounded-[26px] border px-4 py-2 shadow-lg"
            : "w-35 rounded-2xl border px-5 py-4 shadow",
          variant === "stack"
            ? stackStatusStyles[data.status]
            : statusStyles[data.status],
        )}
      >
        {showHandles && (
          <Handle
            id="target-default"
            type="target"
            position={Position.Left}
            style={handleStyle}
          />
        )}
        <p
          className={cn(
            "font-black",
            variant === "stack" ? "text-4xl" : "text-3xl",
          )}
        >
          {data.value}
        </p>
        {showHandles && (
          <Handle
            id="source-default"
            type="source"
            position={Position.Right}
            style={handleStyle}
          />
        )}
        {extraHandles.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type={handle.type}
            position={handle.position}
            style={{
              ...handleStyle,
              ...handle.style,
            }}
          />
        ))}
      </motion.div>
      <div className="text-muted-foreground flex h-4 items-center justify-center text-center text-xs">
        {data.helperText ?? ""}
      </div>
    </div>
  );
}
