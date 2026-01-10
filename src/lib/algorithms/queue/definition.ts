import type {
  AlgorithmDefinition,
  VisualizationState,
} from "lib/algorithms/types";
import type { QueueInput } from "./types";

export type { QueueInput } from "./types";

const defaultQueueInput: QueueInput = {
  values: [],
};

function buildQueueVisualization(_input: QueueInput): VisualizationState {
  return {
    nodes: [],
    edges: [],
  };
}

export const queueDefinition = {
  id: "queue",
  name: "Queue",
  category: "Linear Data Structures",
  description:
    "Queues model first-in, first-out behavior. This placeholder will be expanded with enqueue/dequeue steps.",
  placeholder: "e.g. 3, 5, 8",
  presets: [],
  defaultInput: { ...defaultQueueInput },
  buildVisualization: buildQueueVisualization,
} satisfies AlgorithmDefinition<QueueInput>;
