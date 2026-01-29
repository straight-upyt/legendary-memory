import Database from "better-sqlite3";

export const db = new Database("trades.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY,
    symbol TEXT,
    side TEXT,
    qty REAL,
    price REAL,
    time INTEGER
  )
`).run();
