let errorCount = 0;
let pnl = 0;
let tripped = false;

const MAX_ERRORS = 5;
const MAX_LOSS = -300;

export function recordError() {
  errorCount++;
  check();
}

export function recordPnL(delta: number) {
  pnl += delta;
  check();
}

function check() {
  if (errorCount >= MAX_ERRORS || pnl <= MAX_LOSS) {
    tripped = true;
    console.error("🚨 CIRCUIT BREAKER TRIPPED");
  }
}

export function ensureCircuit() {
  if (tripped) {
    throw new Error("⛔ Trading halted by circuit breaker");
  }
}
