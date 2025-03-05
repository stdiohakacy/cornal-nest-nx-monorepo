import { OrderAggregate } from '../../domain/aggregate-roots/order.entity';
import { OrderRepositoryInterface } from '../ports/order.repository';
import { v4 as uuid } from 'uuid';

interface CreateOrderDto {
  items: { productId: string; quantity: number; price: number }[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(dto: CreateOrderDto): Promise<OrderAggregate> {
    const order = new OrderAggregate(uuid(), dto.items, 'CREATED');
    await this.orderRepository.save(order);
    return order;
  }
}
