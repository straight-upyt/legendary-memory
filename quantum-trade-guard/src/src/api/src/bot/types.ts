export type OrderSide = "buy" | "sell";

export interface OrderPayload {
  symbol: string;
  side: OrderSide;
  qty: number;
  price?: number;
}

export interface QueueJob<TPayload = OrderPayload> {
  id: string;
  payload: TPayload;
  createdAt: number;
}

export interface QueueItem<TPayload = OrderPayload> {
  job: QueueJob<TPayload>;

  attempts: number;
  maxAttempts: number;

  done?: () => void | Promise<void>;
  fail?: () => void | Promise<void>;
}
