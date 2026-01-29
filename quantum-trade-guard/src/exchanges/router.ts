import { BinanceExchange } from "./binance";
import { PaperExchange } from "./paper";

const binance = new BinanceExchange();
const paper = new PaperExchange();

export async function routeOrder(
  symbol: string,
  side: "BUY" | "SELL",
  qty: number
) {
  if (process.env.PAPER_MODE === "true") {
    return paper.placeOrder(symbol, side.toLowerCase(), qty);
  }

  return binance.placeOrder(symbol, side, qty);
}
