import { OrderEventPublisherInterface } from '../ports/order-event.publisher.interface';
import { OrderRepositoryInterface } from '../ports/order.repository.interface';
import {
  OrderResponseDTO,
  OrderDTOMapper,
  CreateOrderDTO,
  OrderFactory,
} from '@cornal-nest-nx-monorepo/order';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly eventPublisher: OrderEventPublisherInterface
  ) {}

  async execute(dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    const order = OrderFactory.createOrder(dto.items);

    await this.orderRepository.save(order);
    await this.eventPublisher.publishOrderCreatedEvent(order.id, dto.items);

    return OrderDTOMapper.toDTO(order);
  }
}
