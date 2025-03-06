export class OrderAggregate {
  private _id: string;
  private _items: Array<{ productId: string; quantity: number }>;
  private _status: 'CREATED' | 'CONFIRMED' | 'CANCELED';

  constructor(
    id: string,
    items: Array<{ productId: string; quantity: number }>,
    status: 'CREATED' | 'CONFIRMED' | 'CANCELED' = 'CREATED'
  ) {
    this._id = id;
    this._items = items;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  get items(): Array<{ productId: string; quantity: number }> {
    return this._items;
  }

  get status(): 'CREATED' | 'CONFIRMED' | 'CANCELED' {
    return this._status;
  }

  confirmOrder() {
    if (this._status !== 'CREATED') {
      throw new Error('Order can only be confirmed if it is in CREATED status');
    }

    this._status = 'CONFIRMED';
  }

  cancelOrder() {
    if (this._status === 'CONFIRMED') {
      throw new Error('Cannot cancel a CONFIRMED order');
    }

    this._status = 'CANCELED';
  }
}
