import { OrderRepositoryInterface } from '../../application/ports/order.repository.interface';
import { OrderAggregate } from '../../domain/aggregate-roots/order.entity';

export class OrderRepositoryImpl implements OrderRepositoryInterface {
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
