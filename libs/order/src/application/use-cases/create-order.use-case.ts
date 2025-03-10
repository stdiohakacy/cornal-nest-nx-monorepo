import { CreateOrderDTO } from 'apps/order-service/src/adapters/dtos/create-order.dto';
import { OrderAggregate } from '../../domain/aggregate-roots/order.aggregate';
import { OrderFactory } from '../../domain/factories/order.factory';
import { OrderEventPublisherInterface } from '../ports/order-event.publisher.interface';
import { OrderRepositoryInterface } from '../ports/order.repository.interface';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly eventPublisher: OrderEventPublisherInterface
  ) {}

  async execute(dto: CreateOrderDTO): Promise<OrderAggregate> {
    const order = OrderFactory.createOrder(dto.items);
    await this.orderRepository.save(order);
    await this.eventPublisher.publishOrderCreatedEvent(order.id, dto.items);
    return order;
  }
}
