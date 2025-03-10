export abstract class BaseDomainEvent {
  readonly occurredAt: Date;
  readonly aggregateId: string;

  constructor(aggregateId: string) {
    this.occurredAt = new Date();
    this.aggregateId = aggregateId;
  }
}
