import { useEffect, useMemo, useState } from "react";

import { Background, ReactFlow, type ReactFlowInstance } from "@xyflow/react";

import type {
  VisualizationEdge,
  VisualizationNode,
  VisualizationState,
} from "@/lib/algorithms/types";
import { ArrayNode } from "@/components/visualization/ArrayNode";
import { ListNode } from "@/components/visualization/ListNode";

type FlowInstance = ReactFlowInstance<VisualizationNode, VisualizationEdge>;

type VisualizationCanvasProps = {
  visualization: VisualizationState | null;
  fitViewKey?: string;
  isPlaying?: boolean;
  stepLabel?: string;
  stepDescription?: string;
  stepCount?: number;
  stepIndex?: number;
};

export function VisualizationCanvas({
  visualization,
  fitViewKey,
  isPlaying = false,
  stepLabel,
  stepDescription,
  stepCount,
  stepIndex,
}: VisualizationCanvasProps) {
  const [flowInstance, setFlowInstance] = useState<FlowInstance | null>(null);

  const nodeTypes = useMemo(
    () => ({
      arrayNode: ArrayNode,
      listNode: ListNode,
    }),
    [],
  );

  const hasVisualization = Boolean(visualization && visualization.nodes.length);

  const handleZoomIn = () => flowInstance?.zoomIn?.();
  const handleZoomOut = () => flowInstance?.zoomOut?.();
  const handleReset = () => flowInstance?.fitView?.({ padding: 0.4 });

  useEffect(() => {
    if (!flowInstance || !hasVisualization || isPlaying) return;
    flowInstance.fitView?.({ padding: 0.4 });
  }, [flowInstance, hasVisualization, fitViewKey, isPlaying]);

  const animatedNodes = useMemo(() => {
    if (!visualization) return [];
    return visualization.nodes.map((node) => ({
      ...node,
      style: {
        transition: "transform 420ms ease, opacity 300ms ease",
        ...node.style,
      },
    }));
  }, [visualization]);

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
        <div className="border-border/60 bg-muted/20 flex h-full items-center rounded-2xl border px-4">
          <ZoomControls
            disabled={!hasVisualization || !flowInstance || isPlaying}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />
        </div>
      </div>
      <div className="bg-background h-full w-full flex-1 overflow-hidden rounded-2xl border">
        {hasVisualization && visualization ? (
          <ReactFlow
            nodes={animatedNodes}
            edges={visualization.edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={!isPlaying}
            panOnScroll={false}
            zoomOnScroll={!isPlaying}
            zoomOnDoubleClick={!isPlaying}
            proOptions={{ hideAttribution: true }}
            onInit={setFlowInstance}
          >
            <Background color="hsl(var(--muted-foreground) / 0.2)" gap={30} />
          </ReactFlow>
        ) : (
          <EmptyState />
        )}
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
