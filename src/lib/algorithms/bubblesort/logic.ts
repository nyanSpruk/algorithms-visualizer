import type { VisualizationState, VisualizationStep } from "lib/algorithms/types";
import type { ArrayNodeStatus } from "lib/algorithms/shared/array";

import type { BubbleSortInput } from "./types";

const NODE_HORIZONTAL_SPACING = 140;

type BubbleSortItem = {
  id: string;
  value: number;
};

function buildArrayVisualization(
  items: BubbleSortItem[],
  statuses: ArrayNodeStatus[],
  maxValue: number,
): VisualizationState {
  if (!items.length) {
    return { nodes: [], edges: [] };
  }

  const normalizedMax = maxValue === 0 ? 1 : maxValue;

  const nodes = items.map((item, index) => ({
    id: `array-node-${item.id}`,
    type: "arrayNode" as const,
    position: { x: index * NODE_HORIZONTAL_SPACING, y: 0 },
    data: {
      value: item.value,
      status: statuses[index] ?? "default",
      index,
      maxValue: normalizedMax,
    },
  }));

  return { nodes, edges: [] };
}

function buildBaseStatuses(
  length: number,
  sortedStartIndex: number,
): ArrayNodeStatus[] {
  const statuses: ArrayNodeStatus[] = Array.from(
    { length },
    () => "default",
  );

  for (let index = sortedStartIndex; index < length; index += 1) {
    statuses[index] = "sorted";
  }

  return statuses;
}

export function buildBubbleSortVisualization(
  input: BubbleSortInput,
): VisualizationState {
  const maxValue = input.reduce(
    (max, value) => Math.max(max, Math.abs(value)),
    0,
  );
  const statuses = buildBaseStatuses(input.length, input.length);
  const items = input.map((value, index) => ({
    id: String(index),
    value,
  }));

  return buildArrayVisualization(items, statuses, maxValue);
}

export function buildBubbleSortSteps(
  input: BubbleSortInput,
): VisualizationStep[] {
  if (!input.length) return [];

  const items = input.map((value, index) => ({
    id: String(index),
    value,
  }));
  const maxValue = input.reduce(
    (max, value) => Math.max(max, Math.abs(value)),
    0,
  );
  const steps: VisualizationStep[] = [];
  const total = items.length;

  const pushStep = (
    idSuffix: string,
    label: string,
    statuses: ArrayNodeStatus[],
    description?: string,
  ) => {
    steps.push({
      id: `bubble-${steps.length}-${idSuffix}`,
      label,
      description,
      state: buildArrayVisualization(items, statuses, maxValue),
    });
  };

  pushStep(
    "start",
    "Start",
    buildBaseStatuses(total, total),
    "Begin with the initial array order.",
  );

  for (let pass = 0; pass < total - 1; pass += 1) {
    let swapped = false;
    const sortedStartIndex = total - pass;

    for (let index = 0; index < total - 1 - pass; index += 1) {
      const comparingStatuses = buildBaseStatuses(total, sortedStartIndex);
      comparingStatuses[index] = "comparing";
      comparingStatuses[index + 1] = "comparing";
      pushStep(
        `compare-${pass}-${index}`,
        `Compare ${items[index].value} and ${items[index + 1].value}`,
        comparingStatuses,
        "Check if the left value is larger than the right value.",
      );

      if (items[index].value > items[index + 1].value) {
        swapped = true;
        const swappingStatuses = buildBaseStatuses(total, sortedStartIndex);
        swappingStatuses[index] = "swapping";
        swappingStatuses[index + 1] = "swapping";
        pushStep(
          `swap-${pass}-${index}`,
          `Swap ${items[index].value} and ${items[index + 1].value}`,
          swappingStatuses,
          "Swap to move the larger value one position to the right.",
        );

        const temp = items[index];
        items[index] = items[index + 1];
        items[index + 1] = temp;

        const afterSwapStatuses = buildBaseStatuses(total, sortedStartIndex);
        afterSwapStatuses[index] = "swapping";
        afterSwapStatuses[index + 1] = "swapping";
        pushStep(
          `swapped-${pass}-${index}`,
          "Swapped",
          afterSwapStatuses,
          "Values have been swapped in the array.",
        );
      }
    }

    const nextSortedStartIndex = total - pass - 1;
    pushStep(
      `pass-${pass}`,
      `Pass ${pass + 1} complete`,
      buildBaseStatuses(total, nextSortedStartIndex),
      "The largest unsorted value has bubbled to its final position.",
    );

    if (!swapped) {
      pushStep(
        "no-swaps",
        "No swaps on this pass",
        buildBaseStatuses(total, nextSortedStartIndex),
        "Everything checked was already in order.",
      );
    }
  }

  pushStep(
    "done",
    "Sorted",
    buildBaseStatuses(total, 0),
    "All values are in ascending order.",
  );
  return steps;
}
