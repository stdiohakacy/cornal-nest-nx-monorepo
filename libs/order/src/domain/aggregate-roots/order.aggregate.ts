import { v4 as uuid } from 'uuid';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../value-objects/order-status.vo';
import { BaseDomainEvent } from '../events/base.event';
import { OrderConfirmedEvent } from '../events/order-confirmed.event';
import { OrderCanceledEvent } from '../events/order-canceled.event';
import { OrderCreatedEvent } from '../events/order-created.event';

export class OrderAggregate {
  private readonly _id: string;
  private readonly _items: readonly OrderItem[];
  private readonly _domainEvents: BaseDomainEvent[] = [];
  private _status: OrderStatus;

  constructor(id: string, items: OrderItem[], status: OrderStatus) {
    this._id = id;
    this._items = Object.freeze(items);
    this._status = status;
  }

  static create(items: OrderItem[]): OrderAggregate {
    if (!items || !items.length) {
      throw new Error('Order must have at least one item.');
    }

    const order = new OrderAggregate(uuid(), items, new OrderStatus('CREATED'));
    order._domainEvents.push(
      new OrderCreatedEvent(
        order._id,
        order._items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.amount,
          currency: item.price.currency,
        }))
      )
    );
    return order;
  }

  get id(): string {
    return this._id;
  }

  get items(): readonly OrderItem[] {
    return this._items;
  }

  get totalPrice(): number {
    return this._items.reduce(
      (total, item) => total + item.calculateTotalPrice().amount,
      0
    );
  }

  get status(): OrderStatus {
    return this._status;
  }

  confirmOrder(): void {
    if (!this._status.isCreated()) {
      throw new Error(
        'Order can only be confirmed if it is in CREATED status.'
      );
    }

    this._status = new OrderStatus('CONFIRMED');
    this._domainEvents.push(new OrderConfirmedEvent(this._id));
  }

  cancelOrder(reason?: string): void {
    if (this._status.isConfirmed()) {
      throw new Error('Cannot cancel a CONFIRMED order.');
    }

    this._status = new OrderStatus('CANCELED');
    this._domainEvents.push(new OrderCanceledEvent(this._id, reason));
  }

  getDomainEvents(): BaseDomainEvent[] {
    return this._domainEvents;
  }
}
