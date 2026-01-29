import { QueueItem, QueueJob } from "./types";

const queue: QueueItem[] = [];

export function enqueue(job: QueueJob): void {
  queue.push({
    job,
    attempts: 0,
    maxAttempts: 3
  });
}

export async function nextJob(): Promise<QueueItem | null> {
  return queue.shift() ?? null;
}
