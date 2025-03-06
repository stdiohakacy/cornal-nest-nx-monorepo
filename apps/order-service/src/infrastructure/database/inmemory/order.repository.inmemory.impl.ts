import {
  OrderAggregate,
  OrderRepositoryInterface,
} from '@cornal-nest-nx-monorepo/order';

export class OrderRepositoryInMemoryImpl implements OrderRepositoryInterface {
  private orders: OrderAggregate[] = [];

  async findById(id: string): Promise<OrderAggregate | null> {
    return this.orders.find((o) => o.id === id) || null;
  }

  async save(order: OrderAggregate): Promise<void> {
    const index = this.orders.findIndex((o) => o.id === order.id);
    if (index === -1) {
      this.orders.push(order);
    } else {
      this.orders[index] = order;
    }
  }
}
