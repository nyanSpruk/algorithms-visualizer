export interface AlgorithmPreset<TInput> {
  id: string;
  label: string;
  description?: string;
  value: TInput;
}

export interface AlgorithmDefinition<TInput = number[]> {
  id: string;
  name: string;
  category: string;
  description: string;
  placeholder?: string;
  presets: AlgorithmPreset<TInput>[];
}

export type AlgorithmRegistry = Record<string, AlgorithmDefinition>;
