import { OrderItem } from '../entities/order-item.entity';
import { Money } from '../value-objects/money.vo';
import { OrderAggregate } from '../aggregate-roots/order.aggregate';
import { v4 as uuid } from 'uuid';

export class OrderFactory {
  static createOrder(
    items: {
      productId: string;
      quantity: number;
      price: number;
      currency: string;
    }[]
  ): OrderAggregate {
    if (!items || items.length === 0) {
      throw new Error('Order must have at least one item.');
    }

    const orderItems = items.map((item) => {
      return new OrderItem(
        uuid(),
        item.productId,
        item.quantity,
        new Money(item.price, item.currency)
      );
    });

    return OrderAggregate.create(orderItems);
  }
}
