"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = getAccount;
exports.buy = buy;
exports.sell = sell;
const crypto_1 = __importDefault(require("crypto"));
const trades_1 = require("./trades");
const account = {
    balance: 10000,
    positions: {},
    pnl: 0
};
function getAccount() {
    return account;
}
function buy(symbol, qty, price) {
    const cost = qty * price;
    if (account.balance < cost)
        return;
    account.balance -= cost;
    const pos = account.positions[symbol] ?? { qty: 0, avgPrice: 0 };
    pos.avgPrice =
        (pos.qty * pos.avgPrice + qty * price) / (pos.qty + qty);
    pos.qty += qty;
    account.positions[symbol] = pos;
    (0, trades_1.recordTrade)({
        id: crypto_1.default.randomUUID(),
        symbol,
        side: "BUY",
        qty,
        price,
        ts: Date.now()
    });
}
function sell(symbol, qty, price) {
    const pos = account.positions[symbol];
    if (!pos || pos.qty < qty)
        return;
    pos.qty -= qty;
    account.balance += qty * price;
    account.pnl += (price - pos.avgPrice) * qty;
    (0, trades_1.recordTrade)({
        id: crypto_1.default.randomUUID(),
        symbol,
        side: "SELL",
        qty,
        price,
        ts: Date.now()
    });
}
