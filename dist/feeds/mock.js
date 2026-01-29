"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMockFeed = startMockFeed;
const market_1 = require("../state/market");
function startMockFeed() {
    setInterval(() => {
        const price = 30000 + Math.random() * 500;
        (0, market_1.updateTick)({
            symbol: "BTCUSDT",
            price: Number(price.toFixed(2)),
            time: Date.now()
        });
    }, 1000);
}
