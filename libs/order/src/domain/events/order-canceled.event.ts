import { BaseDomainEvent } from './base.event';

export class OrderCanceledEvent extends BaseDomainEvent {
  readonly reason?: string;

  constructor(orderId: string, reason?: string) {
    super(orderId);
    this.reason = reason;
  }
}
