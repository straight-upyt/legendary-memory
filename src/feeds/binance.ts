import WebSocket, { RawData } from "ws";
import { updateTick } from "../state/market";

export function startBinanceFeed() {
  const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
  );

  ws.on("open", () => {
    console.log("🟡 Binance feed connected");
  });

  ws.on("message", (data: RawData) => {
    const msg = JSON.parse(data.toString());

    updateTick({
      symbol: "BTCUSDT",
      price: Number(msg.p),
      time: msg.T
    });
  });

  ws.on("error", (err: Error) => {
    console.error("🔴 Binance WS error:", err.message);
  });
}
