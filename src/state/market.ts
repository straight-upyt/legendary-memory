// src/state/market.ts

export type MarketTick = {
  symbol: string;
  price: number;
  time: number;
};

let lastTick: MarketTick | null = null;

export function updateTick(tick: MarketTick) {
  lastTick = tick;
  console.log(
    `📈 ${tick.symbol} ${tick.price} @ ${new Date(tick.time).toISOString()}`
  );
}

export function getLastTick() {
  return lastTick;
}




