import { StubExchange } from "../exchanges/stub";

const exchange = new StubExchange();

type Job = {
  payload: any;
  attempts: number;
};

const queue: Job[] = [];

const sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms));

export async function startWorker() {
  console.log("🧵 Worker started");

  while (true) {
    const job = queue.shift();

    if (!job) {
      await sleep(100);
      continue;
    }

    try {
      await exchange.placeOrder(job.payload);
      console.log("✅ Trade executed", job.payload);
    } catch (err) {
      job.attempts++;
      console.error("❌ Trade failed", err);

      if (job.attempts >= 3) {
        console.error("🪦 Moved to DLQ", job);
      }
    }
  }
}

startWorker();
