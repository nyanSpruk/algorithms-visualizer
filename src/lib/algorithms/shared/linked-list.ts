import type { CSSProperties } from "react";

import type { Position } from "@xyflow/react";

import type { VisualizationNodeData } from "./base-node";

export type LinkedListNodeStatus =
  | "default"
  | "current"
  | "checked"
  | "found"
  | "new"
  | "removed";

export interface LinkedListNodeState {
  id: string;
  value: number | string;
  status?: LinkedListNodeStatus;
  label?: string;
  helperText?: string;
}

export type ListNodeVariant = "default" | "stack";

export interface LinkedListVisualizationNodeData
  extends LinkedListNodeState,
    VisualizationNodeData {
  index: number;
  status: LinkedListNodeStatus;
  showHandles?: boolean;
  orientation?: "vertical" | "horizontal";
  variant?: ListNodeVariant;
  handles?: Array<{
    id: string;
    type: "source" | "target";
    position: Position;
    style?: CSSProperties;
  }>;
}
