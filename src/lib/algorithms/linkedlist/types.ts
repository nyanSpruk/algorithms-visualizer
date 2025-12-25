export interface LinkedListInput {
  values: number[];
  target?: number;
}

export function cloneLinkedListInput(
  input: LinkedListInput,
): LinkedListInput {
  return {
    ...input,
    values: [...input.values],
  };
}
