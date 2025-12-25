import type { AlgorithmDefinition } from "lib/algorithms/types";
import { buildLinkedListVisualization } from "./logic";
import type { LinkedListInput } from "./types";
import { cloneLinkedListInput } from "./types";

export type { LinkedListInput } from "./types";

const defaultLinkedListInput: LinkedListInput = {
  values: [5, 1, 4, 8, 3],
  target: 4,
};

export const linkedListDefinition = {
  id: "linked-list-traversal",
  name: "Linked List",
  category: "Linear Data Structures",
  description:
    "Visualize creating a linked list, then perform common operations like deletion or searching with the list already built.",
  placeholder: "values=5, 1, 4; target=4; ops=delete:5",
  presets: [
    {
      id: "search-middle",
      label: "Search middle value",
      description: "Demonstrates scanning for a target value in the list.",
      value: cloneLinkedListInput(defaultLinkedListInput),
    },
    {
      id: "delete-tail",
      label: "Remove the tail",
      description: "Shows the tail being removed from the list.",
      value: {
        values: [12, 9, 7, 5],
        target: 5,
      },
    },
  ],
  defaultInput: cloneLinkedListInput(defaultLinkedListInput),
  buildVisualization: buildLinkedListVisualization,
} satisfies AlgorithmDefinition<LinkedListInput>;
