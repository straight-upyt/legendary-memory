import { TradeSignal } from "./types";

export class RiskController {
  maxSize = 0.05;
  allowed = ["BTCUSDT"];

  assert(signal: TradeSignal) {
    if (!this.allowed.includes(signal.symbol)) {
      throw new Error("Symbol blocked");
    }
    if (signal.size > this.maxSize) {
      throw new Error("Size too large");
    }
  }
}
