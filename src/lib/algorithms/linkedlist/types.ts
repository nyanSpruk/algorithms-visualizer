export interface LinkedListInput {
  values: number[];
  target?: number;
  buildFromEmpty?: boolean;
  operation?: "remove-tail";
}

export function cloneLinkedListInput(
  input: LinkedListInput,
): LinkedListInput {
  return {
    ...input,
    values: [...input.values],
  };
}
