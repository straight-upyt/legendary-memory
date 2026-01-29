"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordTrade = recordTrade;
exports.getTrades = getTrades;
const trades = [];
function recordTrade(trade) {
    trades.push(trade);
}
function getTrades() {
    return trades.slice().reverse();
}
