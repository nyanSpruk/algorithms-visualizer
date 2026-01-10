import { MarkerType } from "@xyflow/react";

import type {
  VisualizationState,
  VisualizationStep,
} from "lib/algorithms/types";
import type {
  LinkedListNodeStatus,
  LinkedListVisualizationNodeData,
} from "lib/algorithms/shared/linked-list";
import type { LinkedListInput } from "./types";

const NODE_SPACING = 180;

function buildDefaultStatuses(length: number): LinkedListNodeStatus[] {
  return Array<LinkedListNodeStatus>(length).fill("default");
}

function buildLinkedListNodes(
  values: number[],
  statuses?: LinkedListNodeStatus[],
  newIndex?: number,
): LinkedListVisualizationNodeData[] {
  return values.map<LinkedListVisualizationNodeData>((value, index, array) => {
    const id = `node-${index}-${value}`;
    let status: LinkedListNodeStatus = statuses?.[index] ?? "default";

    if (!statuses && typeof newIndex === "number" && newIndex === index) {
      status = "new";
    }

    return {
      id,
      value,
      index,
      orientation: "horizontal",
      status,
      label:
        index === 0 ? "HEAD" : index === array.length - 1 ? "TAIL" : undefined,
    };
  });
}

function buildLinkedListVisualizationForValues(
  values: number[],
  statuses?: LinkedListNodeStatus[],
  newIndex?: number,
): VisualizationState {
  const offset =
    values.length > 1 ? ((values.length - 1) * NODE_SPACING) / 2 : 0;
  const nodes = buildLinkedListNodes(values, statuses, newIndex).map(
    (node) => ({
      id: node.id,
      type: "listNode" as const,
      position: { x: node.index * NODE_SPACING - offset, y: 0 },
      data: node,
    }),
  );

  const edges =
    nodes.length > 1
      ? nodes.slice(0, -1).flatMap((node, index) => {
          const nextNode = nodes[index + 1];
          if (
            node.data.status === "removed" ||
            nextNode.data.status === "removed"
          ) {
            return [];
          }

          return [
            {
              id: `edge-${node.id}-${nextNode.id}`,
              source: node.id,
              target: nextNode.id,
              type: "smoothstep" as const,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#535050",
              },
              style: {
                strokeWidth: 2,
                stroke: "#535050",
              },
            },
          ];
        })
      : [];

  return { nodes, edges };
}

export function buildLinkedListVisualization(
  input: LinkedListInput,
): VisualizationState {
  const defaultStatuses = buildDefaultStatuses(input.values.length);
  return buildLinkedListVisualizationForValues(input.values, defaultStatuses);
}

export function buildLinkedListSteps(
  input: LinkedListInput,
): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const values = input.values;
  const target = input.target;
  const operation = input.operation;

  const buildTraversalStatuses = (
    currentIndex: number,
    isFound: boolean,
  ): LinkedListNodeStatus[] =>
    values.map((_, index) => {
      if (index < currentIndex) return "checked";
      if (index === currentIndex) {
        return isFound ? "found" : "current";
      }
      return "default";
    });

  const pushTraversalSteps = () => {
    if (typeof target !== "number") return;
    for (let index = 0; index < values.length; index += 1) {
      const isFound = values[index] === target;
      steps.push({
        id: `linked-list-check-${index}`,
        label: `Check ${values[index]}`,
        description: `Compare ${values[index]} with target ${target}.`,
        state: buildLinkedListVisualizationForValues(
          values,
          buildTraversalStatuses(index, isFound),
        ),
      });

      if (isFound) {
        steps.push({
          id: `linked-list-found-${index}`,
          label: `Found ${target}`,
          description: "Target value found in the list.",
          state: buildLinkedListVisualizationForValues(
            values,
            buildTraversalStatuses(index, true),
          ),
        });
        if (operation === "remove-tail" && index === values.length - 1) {
          if (values.length <= 1) {
            steps.push({
              id: "linked-list-remove-tail-empty",
              label: "Remove tail",
              description: "Cannot remove the only node in the list.",
              state: buildLinkedListVisualizationForValues(
                values,
                buildTraversalStatuses(index, true),
              ),
            });
          } else {
            const removedStatuses = buildTraversalStatuses(index, true);
            removedStatuses[index] = "removed";
            steps.push({
              id: "linked-list-remove-tail",
              label: "Remove tail",
              description: "Detach the tail node from the list.",
              state: buildLinkedListVisualizationForValues(
                values,
                removedStatuses,
              ),
            });
            const remainingValues = values.slice(0, -1);
            steps.push({
              id: "linked-list-tail-removed",
              label: "Tail removed",
              description: "The tail node has been removed.",
              state: buildLinkedListVisualizationForValues(
                remainingValues,
                buildDefaultStatuses(remainingValues.length),
              ),
            });
          }
        }
        return;
      }
    }

    steps.push({
      id: "linked-list-not-found",
      label: "Not found",
      description: "Reached the end without finding the target.",
      state: buildLinkedListVisualizationForValues(values),
    });
  };

  if (input.buildFromEmpty) {
    steps.push({
      id: "linked-list-start",
      label: "Start",
      description: "Begin with an empty list.",
      state: { nodes: [], edges: [] },
    });

    values.forEach((value, index) => {
      const partialValues = values.slice(0, index + 1);
      steps.push({
        id: `linked-list-insert-${index}`,
        label: `Insert ${value}`,
        description: `Append ${value} to the list.`,
        state: buildLinkedListVisualizationForValues(
          partialValues,
          undefined,
          index,
        ),
      });
    });

    steps.push({
      id: "linked-list-complete",
      label: "List built",
      description: "The linked list is complete.",
      state: buildLinkedListVisualizationForValues(values),
    });

    pushTraversalSteps();
    return steps;
  }

  steps.push({
    id: "linked-list-static",
    label: "List ready",
    description: "The linked list is ready.",
    state: buildLinkedListVisualization(input),
  });
  pushTraversalSteps();
  return steps;
}
