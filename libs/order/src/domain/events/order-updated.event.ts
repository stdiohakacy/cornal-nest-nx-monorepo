import { BaseDomainEvent } from './base.event';

export class OrderUpdatedEvent extends BaseDomainEvent {
  readonly updatedFields: Partial<{ items: any[]; status: string }>;

  constructor(
    orderId: string,
    updatedFields: Partial<{ items: any[]; status: string }>
  ) {
    super(orderId);
    this.updatedFields = updatedFields;
  }
}
