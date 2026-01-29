export class StubExchange {
  async placeOrder(order: any) {
    console.log("STUB ORDER", order);
    return { id: Date.now() };
  }
}
