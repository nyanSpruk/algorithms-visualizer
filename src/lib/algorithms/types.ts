export interface AlgorithmDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  placeholder?: string;
}

export type AlgorithmRegistry = Record<string, AlgorithmDefinition>;
