import { startServer } from "./server";
import { startMockFeed } from "./feeds/mock";

console.log("🚀 QuantumTradeGuard booted");

startServer(3000);
startMockFeed();

