import { db } from "../db/schema";

export class PaperExchange {
  async placeOrder(symbol: string, side: "buy" | "sell", qty: number) {
    const fills = [
      { qty: qty * 0.6, price: 1 },
      { qty: qty * 0.4, price: 1.01 }
    ];

    for (const fill of fills) {
      db.prepare(`
        INSERT INTO trades (symbol, side, qty, price, time)
        VALUES (?, ?, ?, ?, ?)
      `).run(symbol, side, fill.qty, fill.price, Date.now());
    }

    return fills;
  }
}
