import { OrderItemDTO } from './order-item.dto';
import { OrderStatusDTO } from './order-status.dto';

export class OrderDTO {
  id: string;
  items: OrderItemDTO[];
  status: OrderStatusDTO;
}
