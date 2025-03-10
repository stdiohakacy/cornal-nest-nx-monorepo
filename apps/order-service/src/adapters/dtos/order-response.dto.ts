import { OrderItemDTO } from 'libs/order/src/application/dtos/order-item.dto';

export class OrderResponseDTO {
  id: string;
  items: OrderItemDTO[];
  status: string;
}
