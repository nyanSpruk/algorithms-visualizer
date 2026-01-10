import type { VisualizationNodeData } from "./base-node";

export type QueueNodeStatus =
  | "default"
  | "current"
  | "checked"
  | "found"
  | "new"
  | "removed";

export interface QueueNodeState {
  id: string;
  value: number | string;
  status?: QueueNodeStatus;
  label?: string;
}

export interface QueueVisualizationNodeData
  extends QueueNodeState,
    VisualizationNodeData {
  index: number;
  status: QueueNodeStatus;
}

export interface QueueFrameNodeData extends VisualizationNodeData {
  width: number;
  height: number;
}
