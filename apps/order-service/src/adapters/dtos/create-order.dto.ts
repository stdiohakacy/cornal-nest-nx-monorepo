import { OrderItemDTO } from 'libs/order/src/application/dtos/order-item.dto';

export class CreateOrderDTO {
  items: OrderItemDTO[];
}
