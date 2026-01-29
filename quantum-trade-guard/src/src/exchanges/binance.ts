import axios from "axios";
import crypto from "crypto";
import qs from "qs";

const BASE_URL = "https://api.binance.com";

if (process.env.LIVE_TRADING !== "true") {
  throw new Error("🚫 LIVE TRADING DISABLED");
}

const API_KEY = process.env.BINANCE_API_KEY!;
const SECRET = process.env.BINANCE_SECRET!;

function sign(query: string) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(query)
    .digest("hex");
}

export class BinanceExchange {
  async placeOrder(
    symbol: string,
    side: "BUY" | "SELL",
    quantity: number
  ) {
    const params = {
      symbol,
      side,
      type: "MARKET",
      quantity,
      timestamp: Date.now()
    };

    const query = qs.stringify(params);
    const signature = sign(query);

    const res = await axios.post(
      `${BASE_URL}/api/v3/order?${query}&signature=${signature}`,
      null,
      {
        headers: { "X-MBX-APIKEY": API_KEY }
      }
    );

    return res.data;
  }
}
