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
};

export function VisualizationCanvas({
  visualization,
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
    if (!flowInstance || !hasVisualization || !visualization) return;
    flowInstance.fitView?.({ padding: 0.4 });
  }, [flowInstance, hasVisualization, visualization]);

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex items-center justify-end gap-2">
        <ZoomControls
          disabled={!hasVisualization || !flowInstance}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      </div>
      <div className="bg-background h-full w-full flex-1 overflow-hidden rounded-2xl border">
        {hasVisualization && visualization ? (
          <ReactFlow
            nodes={visualization.nodes}
            edges={visualization.edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag
            panOnScroll={false}
            zoomOnScroll
            zoomOnDoubleClick={false}
            fitView
            fitViewOptions={{ padding: 0.4 }}
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
