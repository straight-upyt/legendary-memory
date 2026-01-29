let tradeCount = 0;

export function recordTrade() {
  tradeCount++;
}

export function printMetrics() {
  console.log(`📊 Trades executed: ${tradeCount}`);
}
