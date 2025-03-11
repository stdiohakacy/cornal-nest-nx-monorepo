import { OrderItemDTO } from '../dtos/order-item.dto';

export interface OrderEventPublisherInterface {
  publishOrderCreatedEvent(order: string, items: OrderItemDTO[]): void;
}
