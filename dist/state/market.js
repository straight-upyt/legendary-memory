"use strict";
// src/state/market.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTick = updateTick;
exports.getLastTick = getLastTick;
let lastTick = null;
function updateTick(tick) {
    lastTick = tick;
    console.log(`📈 ${tick.symbol} ${tick.price} @ ${new Date(tick.time).toISOString()}`);
}
function getLastTick() {
    return lastTick;
}
