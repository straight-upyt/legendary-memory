import { nextJob } from "./queue";
import { StubExchange } from "../exchanges/stub";

const exchange = new StubExchange();

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

async function run(): Promise<void> {
  console.log("🧵 Worker started");

  while (true) {
    const item = await nextJob();

    if (!item) {
      await sleep(50);
      continue;
    }

    try {
      await exchange.placeOrder(item.job.payload);
      if (item.done) await item.done();
    } catch (err) {
      item.attempts++;

      console.error("❌ Order failed", err);

      if (item.attempts >= item.maxAttempts) {
        console.error("☠️ DLQ reached", item);
        if (item.fail) await item.fail();
      }
    }
  }
}

run().catch(err => {
  console.error("🔥 Worker crashed", err);
  process.exit(1);
});
