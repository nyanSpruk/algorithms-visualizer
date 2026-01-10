import type {
  VisualizationState,
  VisualizationStep,
} from "lib/algorithms/types";
import type {
  QueueNodeStatus,
  QueueVisualizationNodeData,
} from "lib/algorithms/shared/queue";
import type { QueueInput } from "./types";

const NODE_SIZE = 80;
const NODE_GAP = 16;
const FRAME_PADDING = 16;
const NODE_SPACING = NODE_SIZE + NODE_GAP;

function buildDefaultStatuses(length: number): QueueNodeStatus[] {
  return Array<QueueNodeStatus>(length).fill("default");
}

function buildQueueNodes(
  values: number[],
  statuses?: QueueNodeStatus[],
  newIndex?: number,
): QueueVisualizationNodeData[] {
  return values.map<QueueVisualizationNodeData>((value, index, array) => {
    let status: QueueNodeStatus = statuses?.[index] ?? "default";
    if (!statuses && typeof newIndex === "number" && newIndex === index) {
      status = "new";
    }

    return {
      id: `queue-node-${index}-${value}`,
      value,
      index,
      status,
      label:
        index === 0
          ? "FRONT"
          : index === array.length - 1
            ? "REAR"
            : undefined,
    };
  });
}

function buildQueueVisualizationForValues(
  values: number[],
  statuses?: QueueNodeStatus[],
  newIndex?: number,
  layoutSlotCount?: number,
): VisualizationState {
  const slotCount = Math.max(layoutSlotCount ?? values.length, 1);
  const offset = slotCount > 1 ? ((slotCount - 1) * NODE_SPACING) / 2 : 0;
  const frameWidth =
    slotCount * NODE_SIZE + (slotCount - 1) * NODE_GAP + FRAME_PADDING * 2;
  const frameHeight = NODE_SIZE + FRAME_PADDING * 2;
  const nodes = buildQueueNodes(values, statuses, newIndex).map((node) => ({
    id: node.id,
    type: "queueNode" as const,
    position: {
      x: node.index * NODE_SPACING - offset,
      y: FRAME_PADDING,
    },
    draggable: false,
    selectable: false,
    data: node,
  }));

  const frameNode = {
    id: "queue-frame",
    type: "queueFrame" as const,
    position: { x: -offset - FRAME_PADDING, y: 0 },
    draggable: false,
    selectable: false,
    data: {
      width: frameWidth,
      height: frameHeight,
    },
    style: {
      zIndex: -1,
    },
  };

  return { nodes: [frameNode, ...nodes], edges: [] };
}

export function buildQueueVisualization(input: QueueInput): VisualizationState {
  const defaultStatuses = buildDefaultStatuses(input.values.length);
  return buildQueueVisualizationForValues(input.values, defaultStatuses);
}

export function buildQueueSteps(input: QueueInput): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const values = input.values;
  const buildSlotCount = Math.max(values.length, 1);

  const pushEnqueueSteps = (enqueueValue?: number) => {
    if (typeof enqueueValue !== "number") return;
    steps.push({
      id: "queue-enqueue-start",
      label: "Enqueue",
      description: `Add ${enqueueValue} to the rear of the queue.`,
      state: buildQueueVisualizationForValues(
        values,
        undefined,
        undefined,
        values.length + 1,
      ),
    });
    steps.push({
      id: "queue-enqueue-new",
      label: "Enqueue",
      description: `Append ${enqueueValue} at the rear.`,
      state: buildQueueVisualizationForValues(
        [...values, enqueueValue],
        undefined,
        values.length,
        values.length + 1,
      ),
    });
    steps.push({
      id: "queue-enqueue-done",
      label: "Enqueue complete",
      description: "Queue updated after enqueue.",
      state: buildQueueVisualizationForValues(
        [...values, enqueueValue],
        undefined,
        undefined,
        values.length + 1,
      ),
    });
  };

  const pushDequeueSteps = () => {
    if (values.length === 0) {
      steps.push({
        id: "queue-dequeue-empty",
        label: "Dequeue",
        description: "Queue is empty. Nothing to remove.",
        state: buildQueueVisualizationForValues(values),
      });
      return;
    }

    const removingStatuses = values.map<QueueNodeStatus>((_, index) =>
      index === 0 ? "removed" : "default",
    );
    steps.push({
      id: "queue-dequeue-start",
      label: "Dequeue",
      description: `Remove ${values[0]} from the front.`,
      state: buildQueueVisualizationForValues(
        values,
        removingStatuses,
        undefined,
        values.length,
      ),
    });
    steps.push({
      id: "queue-dequeue-done",
      label: "Dequeue complete",
      description: "Queue updated after dequeue.",
      state: buildQueueVisualizationForValues(
        values.slice(1),
        undefined,
        undefined,
        Math.max(values.length - 1, 1),
      ),
    });
  };

  if (input.buildFromEmpty) {
    steps.push({
      id: "queue-start",
      label: "Start",
      description: "Begin with an empty queue.",
      state: buildQueueVisualizationForValues(
        [],
        undefined,
        undefined,
        buildSlotCount,
      ),
    });

    values.forEach((value, index) => {
      const partialValues = values.slice(0, index + 1);
      steps.push({
        id: `queue-enqueue-${index}`,
        label: `Enqueue ${value}`,
        description: `Add ${value} to the rear.`,
        state: buildQueueVisualizationForValues(
          partialValues,
          undefined,
          index,
          buildSlotCount,
        ),
      });
    });

    steps.push({
      id: "queue-built",
      label: "Queue ready",
      description: "The queue is ready.",
      state: buildQueueVisualizationForValues(
        values,
        undefined,
        undefined,
        buildSlotCount,
      ),
    });
  } else {
    steps.push({
      id: "queue-ready",
      label: "Queue ready",
      description: "The queue is ready.",
      state: buildQueueVisualization(input),
    });
  }

  if (input.operation === "enqueue") {
    pushEnqueueSteps(input.enqueueValue);
  }

  if (input.operation === "dequeue") {
    pushDequeueSteps();
  }

  return steps;
}
