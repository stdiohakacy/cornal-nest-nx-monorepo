import { BaseDomainEvent } from './base.event';

export class OrderCreatedEvent extends BaseDomainEvent {
  readonly items: {
    productId: string;
    quantity: number;
    price: number;
    currency: string;
  }[];

  constructor(
    orderId: string,
    items: {
      productId: string;
      quantity: number;
      price: number;
      currency: string;
    }[]
  ) {
    super(orderId);
    this.items = items;
  }
}
