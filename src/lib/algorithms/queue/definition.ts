import type { AlgorithmDefinition } from "lib/algorithms/types";
import { buildQueueSteps, buildQueueVisualization } from "./logic";
import type { QueueInput } from "./types";

export type { QueueInput } from "./types";

const defaultQueueInput: QueueInput = {
  values: [6, 3, 9, 4],
};

export const queueDefinition = {
  id: "queue",
  name: "Queue",
  category: "Linear Data Structures",
  description:
    "Queues model first-in, first-out behavior. Watch how items enter at the rear and leave from the front.",
  placeholder: "e.g. 3, 5, 8",
  presets: [
    {
      id: "build-from-empty",
      label: "Build from empty",
      description: "Enqueue items into an empty queue.",
      value: {
        values: [3, 5, 8, 2, 5],
        buildFromEmpty: true,
      },
    },
    {
      id: "dequeue-front",
      label: "Dequeue front",
      description: "Remove the front item from the queue.",
      value: {
        values: [8, 1, 6, 3],
        operation: "dequeue",
      },
    },
    {
      id: "enqueue-rear",
      label: "Enqueue item",
      description: "Add a new item to the rear.",
      value: {
        values: [4, 9, 2],
        operation: "enqueue",
        enqueueValue: 7,
      },
    },
  ],
  defaultInput: { ...defaultQueueInput },
  buildVisualization: buildQueueVisualization,
  buildVisualizationSteps: buildQueueSteps,
  visualizationOptions: {
    showCanvasControls: false,
    allowCanvasPanZoom: false,
  },
} satisfies AlgorithmDefinition<QueueInput>;
