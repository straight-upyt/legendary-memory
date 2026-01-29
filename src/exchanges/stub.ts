export class StubExchange {
  async placeOrder(order: any) {
    console.log("[STUB EXCHANGE]", order);
    return { orderId: "stub-" + Date.now() };
  }
}
