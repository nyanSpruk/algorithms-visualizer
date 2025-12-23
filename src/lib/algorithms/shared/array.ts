export type ArrayNodeStatus =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "range"
  | "inactive"
  | "target";

export interface ArrayNodeState {
  value: number;
  status?: ArrayNodeStatus;
}
