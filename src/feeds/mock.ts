import { updateTick } from "../state/market";

export function startMockFeed() {
  setInterval(() => {
    const price = 30000 + Math.random() * 500;

    updateTick({
      symbol: "BTCUSDT",
      price: Number(price.toFixed(2)),
      time: Date.now()
    });
  }, 1000);
}

