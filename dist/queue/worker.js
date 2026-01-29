"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = startWorker;
const stub_1 = require("../exchanges/stub");
const exchange = new stub_1.StubExchange();
const queue = [];
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
async function startWorker() {
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
        }
        catch (err) {
            job.attempts++;
            console.error("❌ Trade failed", err);
            if (job.attempts >= 3) {
                console.error("🪦 Moved to DLQ", job);
            }
        }
    }
}
startWorker();
