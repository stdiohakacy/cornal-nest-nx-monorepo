import { Money } from '../value-objects/money.vo';

export class OrderItem {
  private readonly _id: string;
  private readonly _productId: string;
  private readonly _quantity: number;
  private readonly _price: Money;

  constructor(id: string, productId: string, quantity: number, price: Money) {
    if (!id) {
      throw new Error('OrderItem ID cannot be empty');
    }
    if (!productId) {
      throw new Error('Product ID cannot be empty');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (!price) {
      throw new Error('Price cannot be null');
    }

    this._id = id;
    this._productId = productId;
    this._quantity = quantity;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): Money {
    return this._price;
  }

  isValid(): boolean {
    return (
      !!this._id &&
      !!this._productId &&
      this._quantity > 0 &&
      this._price !== null
    );
  }

  increaseQuantity(amount: number): OrderItem {
    if (amount <= 0) {
      throw new Error('Increase amount must be greater than zero');
    }
    return new OrderItem(
      this._id,
      this._productId,
      this._quantity + amount,
      this._price
    );
  }

  decreaseQuantity(amount: number): OrderItem {
    if (amount <= 0) {
      throw new Error('Decrease amount must be greater than zero');
    }
    if (this._quantity - amount <= 0) {
      throw new Error('Quantity cannot be zero or negative');
    }
    return new OrderItem(
      this._id,
      this._productId,
      this._quantity - amount,
      this._price
    );
  }

  calculateTotalPrice(): Money {
    return new Money(this._price.amount * this._quantity, this._price.currency);
  }

  equals(other: OrderItem): boolean {
    return this._id === other.id;
  }
}
