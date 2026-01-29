import { Router } from "express";
export const tradesRouter = Router();

const trades: any[] = [];

tradesRouter.get("/", (_, res) => {
  res.json({ ok: true, count: trades.length, data: trades });
});
