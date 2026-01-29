export function computeVaR(pnls: number[], alpha = 0.95) {
  const sorted = [...pnls].sort((a, b) => a - b);
  const index = Math.floor((1 - alpha) * sorted.length);
  return sorted[index];
}

export function computeCVaR(pnls: number[], alpha = 0.95) {
  const varLevel = computeVaR(pnls, alpha);
  const tail = pnls.filter(p => p <= varLevel);
  return tail.reduce((a, b) => a + b, 0) / tail.length;
}
const var95 = computeVaR(portfolioPnL);
const cvar95 = computeCVaR(portfolioPnL);

if (cvar95 < -1000) {
  triggerKillSwitch("CVaR_BREACH");
}
