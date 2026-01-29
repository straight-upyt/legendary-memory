"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBinanceFeed = startBinanceFeed;
const ws_1 = __importDefault(require("ws"));
const market_1 = require("../state/market");
function startBinanceFeed() {
    const ws = new ws_1.default("wss://stream.binance.com:9443/ws/btcusdt@trade");
    ws.on("open", () => {
        console.log("🟡 Binance feed connected");
    });
    ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        (0, market_1.updateTick)({
            symbol: "BTCUSDT",
            price: Number(msg.p),
            time: msg.T
        });
    });
    ws.on("error", (err) => {
        console.error("🔴 Binance WS error:", err.message);
    });
}
