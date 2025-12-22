import type { AlgorithmDefinition } from "lib/algorithms/types";

export const bubbleSortDefinition: AlgorithmDefinition = {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "Sorting",
  description:
    "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order, pushing the largest value to the end of the array with each pass.",
  placeholder: "e.g. 8, 3, 5, 2, 9",
};
