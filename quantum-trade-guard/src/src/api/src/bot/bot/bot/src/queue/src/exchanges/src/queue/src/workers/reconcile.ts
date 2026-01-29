import { db } from "../db/schema";

export function reconcile() {
  const rows = db.prepare(`SELECT COUNT(*) as c FROM trades`).get();
  console.log("🔍 Trades in DB:", rows.c);
}

setInterval(reconcile, 30_000);
