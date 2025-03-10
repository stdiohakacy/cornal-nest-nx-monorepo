import { OrderAggregate } from '../../domain/aggregate-roots/order.aggregate';

export interface OrderRepositoryInterface {
  findAll(): Promise<OrderAggregate[]>;
  findById(id: string): Promise<OrderAggregate | null>;
  save(order: OrderAggregate): Promise<void>;
  deleteById(id: string): Promise<void>;
}
