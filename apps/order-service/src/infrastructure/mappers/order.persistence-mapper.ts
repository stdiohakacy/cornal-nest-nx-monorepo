import { OrderOrmEntity } from '../database/postgres/entities/order.orm-entity';
import { OrderItemOrmEntity } from '../database/postgres/entities/order-item.orm-entity';
import { OrderAggregate } from '@cornal-nest-nx-monorepo/order';
import { OrderStatus, Money, OrderItem } from '@cornal-nest-nx-monorepo/order';

export class OrderPersistenceMapper {
  static toDomain(entity: OrderOrmEntity): OrderAggregate {
    if (!entity) {
      throw new Error('Cannot map null entity to domain');
    }

    if (!OrderStatus.isValidStatus(entity.status)) {
      throw new Error(`Invalid order status in database: ${entity.status}`);
    }

    return new OrderAggregate(
      entity.id,
      entity.items.map((item) => {
        if (!Money.isValidCurrency(item.currency)) {
          throw new Error(`Invalid currency in database: ${item.currency}`);
        }
        return new OrderItem(
          item.id,
          item.productId,
          item.quantity,
          new Money(item.price, item.currency)
        );
      }),
      new OrderStatus(entity.status as 'CREATED' | 'CONFIRMED' | 'CANCELED')
    );
  }

  static toPersistence(order: OrderAggregate): OrderOrmEntity {
    if (!order) {
      throw new Error('Cannot persist a null order');
    }

    return {
      id: order.id,
      items: order.items.map((item) => {
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.amount,
          currency: item.price.currency,
        } as OrderItemOrmEntity;
      }),
      status: order.status.getValue(),
    } as OrderOrmEntity;
  }
}
