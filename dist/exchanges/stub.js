"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StubExchange = void 0;
class StubExchange {
    async placeOrder(order) {
        console.log("[STUB EXCHANGE]", order);
        return { orderId: "stub-" + Date.now() };
    }
}
exports.StubExchange = StubExchange;
