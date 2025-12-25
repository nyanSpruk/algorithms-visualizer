import { bubbleSortDefinition } from "./bubblesort/definition";
import { linkedListDefinition } from "./linkedlist/definition";
import type { AlgorithmDefinition, AlgorithmRegistry } from "./types";

export const algorithmRegistry: AlgorithmRegistry = {
  [bubbleSortDefinition.id]: bubbleSortDefinition,
  [linkedListDefinition.id]: linkedListDefinition,
};

export type AlgorithmId = keyof typeof algorithmRegistry;

export const algorithmList: AlgorithmDefinition[] =
  Object.values(algorithmRegistry);

export function getAlgorithmsByCategory() {
  const grouped: { [category: string]: AlgorithmDefinition[] } = {};

  return algorithmList.reduce((accumulator, currentAlgo) => {
    if (!accumulator[currentAlgo.category]) {
      accumulator[currentAlgo.category] = [];
    }
    accumulator[currentAlgo.category].push(currentAlgo);
    return accumulator;
  }, grouped);
}
