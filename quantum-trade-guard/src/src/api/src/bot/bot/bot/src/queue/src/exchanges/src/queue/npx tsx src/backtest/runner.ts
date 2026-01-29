import "dotenv/config";
import fs from "fs";
import { PaperExchange } from "../exchanges/paper";

export async function runBacktest() {
  const data = JSON.parse(fs.readFileSync("data/prices.json", "utf8"));
  const exchange = new PaperExchange();

  for (const tick of data) {
    if (tick.price < 100) {
      await exchange.placeOrder("BTCUSDT", "buy", 0.01);
    }
  }

  console.log(exchange.getState());
}
"scripts": {
  "engine": "tsx src/latency/runner.ts"
