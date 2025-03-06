import { OrderAggregate } from '../../domain/aggregate-roots/order.aggregate';

export interface OrderRepositoryInterface {
  findById(id: string): Promise<OrderAggregate | null>;
  save(order: OrderAggregate): Promise<void>;
}
