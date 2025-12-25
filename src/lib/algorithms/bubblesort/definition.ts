import type { AlgorithmDefinition } from "lib/algorithms/types";
import type { BubbleSortInput } from "./types";
import { buildBubbleSortVisualization } from "./logic";

export type { BubbleSortInput } from "./types";

const defaultBubbleSortInput: BubbleSortInput = [5, 1, 4, 2, 8];

export const bubbleSortDefinition = {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "Sorting",
  description:
    "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order, pushing the largest value to the end of the array with each pass.",
  placeholder: "e.g. 8, 3, 5, 2, 9",
  presets: [
    {
      id: "nearly-sorted",
      label: "Nearly sorted",
      description: "Great for seeing the early exit optimization.",
      value: [2, 3, 4, 6, 5],
    },
    {
      id: "reversed",
      label: "Reversed",
      description: "Worst-case scenario with the most swaps.",
      value: [9, 7, 5, 3, 1],
    },
    {
      id: "random",
      label: "Random",
      description: "Balanced set of numbers.",
      value: [...defaultBubbleSortInput],
    },
  ],
  defaultInput: [...defaultBubbleSortInput],
  buildVisualization: buildBubbleSortVisualization,
} satisfies AlgorithmDefinition<BubbleSortInput>;
