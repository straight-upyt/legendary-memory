import crypto from "crypto";
import { recordTrade } from "./trades";

type Position = {
  qty: number;
  avgPrice: number;
};

type Account = {
  balance: number;
  positions: Record<string, Position>;
  pnl: number;
};

const account: Account = {
  balance: 10_000,
  positions: {},
  pnl: 0
};

export function getAccount() {
  return account;
}

export function buy(symbol: string, qty: number, price: number) {
  const cost = qty * price;
  if (account.balance < cost) return;

  account.balance -= cost;

  const pos = account.positions[symbol] ?? { qty: 0, avgPrice: 0 };
  pos.avgPrice =
    (pos.qty * pos.avgPrice + qty * price) / (pos.qty + qty);
  pos.qty += qty;

  account.positions[symbol] = pos;

  recordTrade({
    id: crypto.randomUUID(),
    symbol,
    side: "BUY",
    qty,
    price,
    ts: Date.now()
  });
}

export function sell(symbol: string, qty: number, price: number) {
  const pos = account.positions[symbol];
  if (!pos || pos.qty < qty) return;

  pos.qty -= qty;
  account.balance += qty * price;
  account.pnl += (price - pos.avgPrice) * qty;

  recordTrade({
    id: crypto.randomUUID(),
    symbol,
    side: "SELL",
    qty,
    price,
    ts: Date.now()
  });
}
