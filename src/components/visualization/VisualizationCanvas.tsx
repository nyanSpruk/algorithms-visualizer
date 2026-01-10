import { useEffect, useMemo, useRef, useState } from "react";

import { Background, ReactFlow, type ReactFlowInstance } from "@xyflow/react";

import type {
  VisualizationEdge,
  VisualizationNode,
  VisualizationState,
} from "@/lib/algorithms/types";
import { ArrayNode } from "@/components/visualization/ArrayNode";
import { ListNode } from "@/components/visualization/ListNode";
import { QueueFrameNode } from "@/components/visualization/QueueFrameNode";
import { QueueNode } from "@/components/visualization/QueueNode";

type FlowInstance = ReactFlowInstance<VisualizationNode, VisualizationEdge>;

type VisualizationCanvasProps = {
  visualization: VisualizationState | null;
  fitViewKey?: string;
  isPlaying?: boolean;
  stepLabel?: string;
  stepDescription?: string;
  stepCount?: number;
  stepIndex?: number;
  animationDurationMs?: number;
  showControls?: boolean;
  allowPanZoom?: boolean;
  autoFitMode?: "initial" | "none" | "always";
  allowAutoFitWhilePlaying?: boolean;
  suppressEmptyStateText?: boolean;
};

export function VisualizationCanvas({
  visualization,
  fitViewKey,
  isPlaying = false,
  stepLabel,
  stepDescription,
  stepCount,
  stepIndex,
  animationDurationMs = 520,
  showControls = true,
  allowPanZoom = true,
  autoFitMode = "initial",
  allowAutoFitWhilePlaying = false,
  suppressEmptyStateText = false,
}: VisualizationCanvasProps) {
  const [flowInstance, setFlowInstance] = useState<FlowInstance | null>(null);
  const lastFitKeyRef = useRef<string | null>(null);

  const nodeTypes = useMemo(
    () => ({
      arrayNode: ArrayNode,
      listNode: ListNode,
      queueFrame: QueueFrameNode,
      queueNode: QueueNode,
    }),
    [],
  );

  const hasVisualization = Boolean(visualization && visualization.nodes.length);

  const handleZoomIn = () => flowInstance?.zoomIn?.();
  const handleZoomOut = () => flowInstance?.zoomOut?.();
  const handleReset = () => flowInstance?.fitView?.({ padding: 0.4 });

  useEffect(() => {
    if (!flowInstance || !hasVisualization) return;
    if (autoFitMode === "none") return;
    if (isPlaying && !allowAutoFitWhilePlaying) return;

    const resolvedFitKey = fitViewKey ?? "default";
    const hasFitKey = lastFitKeyRef.current === resolvedFitKey;

    if (autoFitMode === "initial" && hasFitKey) return;

    flowInstance.fitView?.({ padding: 0.4 });
    lastFitKeyRef.current = resolvedFitKey;
  }, [
    flowInstance,
    hasVisualization,
    fitViewKey,
    isPlaying,
    autoFitMode,
    allowAutoFitWhilePlaying,
  ]);

  const animatedNodes = useMemo(() => {
    if (!visualization) return [];
    const opacityDuration = Math.max(
      180,
      Math.round(animationDurationMs * 0.7),
    );
    return visualization.nodes.map((node) => ({
      ...node,
      style: {
        transition: `transform ${animationDurationMs}ms ease-in-out, opacity ${opacityDuration}ms ease-in-out`,
        ...node.style,
      },
    }));
  }, [visualization, animationDurationMs]);

  const resolvedStepCount = stepCount ?? 0;
  const resolvedStepIndex = stepIndex ?? 0;
  const stepSummary =
    resolvedStepCount > 0
      ? `Step ${Math.min(resolvedStepIndex + 1, resolvedStepCount)} of ${Math.max(resolvedStepCount, 1)}`
      : "Step 0 of 0";

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="border-border/60 bg-muted/20 grid flex-1 gap-2 rounded-2xl border px-4 py-3 text-center lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            {stepSummary}
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-foreground text-base font-semibold">
              {stepLabel ?? "Step details"}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {stepDescription ??
                "Track comparisons and swaps as the algorithm progresses."}
            </p>
          </div>
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
        {showControls ? (
          <div className="border-border/60 bg-muted/20 flex h-full items-center rounded-2xl border px-4">
            <ZoomControls
              disabled={!hasVisualization || !flowInstance || isPlaying}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
            />
          </div>
        ) : null}
      </div>
      <div className="bg-background relative h-full w-full flex-1 overflow-hidden rounded-2xl border">
        <ReactFlow
          nodes={animatedNodes}
          edges={visualization?.edges ?? []}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={allowPanZoom && !isPlaying}
          panOnScroll={false}
          zoomOnScroll={allowPanZoom && !isPlaying}
          zoomOnDoubleClick={allowPanZoom && !isPlaying}
          proOptions={{ hideAttribution: true }}
          onInit={setFlowInstance}
        >
          <Background color="hsl(var(--muted-foreground) / 0.2)" gap={30} />
        </ReactFlow>
        {!hasVisualization && !suppressEmptyStateText ? (
          <div className="pointer-events-none absolute inset-0">
            <EmptyState />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm">
      <p>No data to visualize yet.</p>
      <p className="text-xs">
        Select a preset to see this algorithm&apos;s visualization.
      </p>
    </div>
  );
}

type ZoomControlsProps = {
  disabled: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

function ZoomControls({
  disabled,
  onZoomIn,
  onZoomOut,
  onReset,
}: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <ZoomButton label="-" onClick={onZoomOut} disabled={disabled} />
      <ZoomButton label="+" onClick={onZoomIn} disabled={disabled} />
      <ZoomButton label="Reset" onClick={onReset} disabled={disabled} />
    </div>
  );
}

type ZoomButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
};

function ZoomButton({ label, disabled, onClick }: ZoomButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="text-foreground/90 bg-card/80 hover:bg-card/90 focus-visible:ring-ring border-border inline-flex h-8 min-w-9 items-center justify-center rounded-full border px-3 text-xs font-semibold tracking-wide uppercase transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
