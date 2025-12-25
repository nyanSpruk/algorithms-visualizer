import type { VisualizationNodeData } from "./base-node";

export type ArrayNodeStatus =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "range"
  | "inactive"
  | "target";

export interface ArrayNodeState {
  value: number;
  status?: ArrayNodeStatus;
}

export interface ArrayVisualizationNodeData
  extends ArrayNodeState,
    VisualizationNodeData {
  index: number;
  maxValue: number;
  status: ArrayNodeStatus;
}
