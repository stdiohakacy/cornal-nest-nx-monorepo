import { BaseDomainEvent } from './base.event';

export class OrderConfirmedEvent extends BaseDomainEvent {
  constructor(orderId: string) {
    super(orderId);
  }
}
