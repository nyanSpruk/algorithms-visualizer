import type { ArrayNodeStatus } from "@/lib/algorithms/shared/array";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const statusStyles: Record<ArrayNodeStatus, string> = {
  default:
    "bg-background border border-border text-foreground shadow-sm dark:bg-card",
  comparing:
    "bg-amber-100 border-amber-400 text-amber-900 shadow-amber-200/80 dark:bg-amber-500/20 dark:text-amber-100",
  swapping:
    "bg-red-100 border-red-400 text-red-900 shadow-red-200/80 dark:bg-red-500/20 dark:text-red-100",
  sorted:
    "bg-emerald-100 border-emerald-400 text-emerald-900 shadow-emerald-200/80 dark:bg-emerald-500/20 dark:text-emerald-100",
  pivot:
    "bg-purple-200 border-purple-600 text-purple-900 shadow-purple-200/80 ring-2 ring-purple-400/60 dark:bg-purple-500/30 dark:text-purple-50",
  range:
    "bg-sky-100 border-sky-400 text-sky-900 shadow-sky-200/80 dark:bg-sky-500/20 dark:text-sky-100",
  inactive:
    "bg-muted text-muted-foreground border-dashed border-muted-foreground/40 dark:bg-muted/40",
  target:
    "bg-teal-100 border-teal-500 text-teal-900 shadow-teal-200/80 ring-2 ring-teal-300/70 dark:bg-teal-500/30 dark:text-teal-50",
};

const statusLabel: Record<ArrayNodeStatus, string> = {
  default: "idle",
  comparing: "comparing",
  swapping: "swapping",
  sorted: "sorted",
  pivot: "pivot",
  range: "range",
  inactive: "inactive",
  target: "target",
};

type ArrayValueNodeProps = {
  value: number;
  index: number;
  maxValue: number;
  status?: ArrayNodeStatus;
};

const MIN_HEIGHT = 40;
const HEIGHT_RANGE = 160;

export function ArrayValueNode({
  value,
  index,
  maxValue,
  status = "default",
}: ArrayValueNodeProps) {
  const ratio =
    maxValue > 0 ? Math.max(Math.abs(value) / maxValue, 0.05) : 0.05;
  const barHeight = MIN_HEIGHT + ratio * HEIGHT_RANGE;

  return (
    <motion.div
      layout="position"
      transition={{ type: "spring", stiffness: 120, damping: 40 }}
      className="flex h-56 w-24 flex-col items-center justify-end gap-1"
    >
      {" "}
      <div className="flex h-full w-full flex-col items-center justify-end">
        <div
          className={cn(
            "flex w-full flex-col items-center justify-end rounded-t-lg border px-1 text-center text-sm font-semibold transition-[height] duration-300 ease-out",
            statusStyles[status],
          )}
          style={{ height: barHeight }}
        >
          <span>{value}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-muted-foreground text-xs font-medium">
          Index {index}
        </p>
        <p className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
          {statusLabel[status]}
        </p>
      </div>
    </motion.div>
  );
}
