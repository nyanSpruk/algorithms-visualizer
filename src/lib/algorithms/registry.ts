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
  return algorithmList.reduce<Record<string, AlgorithmDefinition[]>>(
    (accumulator, currentAlgo) => {
      if (!accumulator[currentAlgo.category])
        accumulator[currentAlgo.category] = [];
      accumulator[currentAlgo.category].push(currentAlgo);
      return accumulator;
    },
    {},
  );
}
