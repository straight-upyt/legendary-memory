import axios from "axios";
import crypto from "crypto";

if (process.env.LIVE_TRADING !== "true") {
  throw new Error("🚫 LIVE TRADING DISABLED");
}

export class BinanceExchange {
  async placeOrder(symbol: string, side: string, qty: number) {
    console.log("⚠️ REAL ORDER WOULD EXECUTE HERE");
    // intentionally incomplete
  }
}
