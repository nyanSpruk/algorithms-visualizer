export interface QueueInput {
  values: number[];
  buildFromEmpty?: boolean;
  operation?: "enqueue" | "dequeue";
  enqueueValue?: number;
}
