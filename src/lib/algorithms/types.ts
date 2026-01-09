import type { Edge, Node } from "@xyflow/react";

import type { ArrayVisualizationNodeData } from "./shared/array";
import type { LinkedListVisualizationNodeData } from "./shared/linked-list";

export interface AlgorithmPreset<TInput> {
  id: string;
  label: string;
  description?: string;
  value: TInput;
}

export type VisualizationNode =
  | Node<ArrayVisualizationNodeData, "arrayNode">
  | Node<LinkedListVisualizationNodeData, "listNode">;

export type VisualizationEdge = Edge;

export interface VisualizationState {
  nodes: VisualizationNode[];
  edges: VisualizationEdge[];
}

export interface VisualizationStep {
  id: string;
  label?: string;
  description?: string;
  state: VisualizationState;
}

export interface AlgorithmDefinition<TInput = any> {
  id: string;
  name: string;
  category: string;
  description: string;
  placeholder?: string;
  presets: AlgorithmPreset<TInput>[];
  defaultInput: TInput;
  buildVisualization: (input: TInput) => VisualizationState;
  buildVisualizationSteps?: (input: TInput) => VisualizationStep[];
  visualizationOptions?: {
    showCanvasControls?: boolean;
    allowCanvasPanZoom?: boolean;
  };
}

export interface AlgorithmRegistry {
  [id: string]: AlgorithmDefinition;
}
