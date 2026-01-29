export type Trade = {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  ts: number;
};

const trades: Trade[] = [];

export function recordTrade(trade: Trade) {
  trades.push(trade);
}

export function getTrades() {
  return trades.slice().reverse();
}
