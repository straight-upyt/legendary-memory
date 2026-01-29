"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const mock_1 = require("./feeds/mock");
console.log("🚀 QuantumTradeGuard booted");
(0, server_1.startServer)(3000);
(0, mock_1.startMockFeed)();
