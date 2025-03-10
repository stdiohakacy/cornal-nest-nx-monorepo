import { OrderItemDTO } from '@cornal-nest-nx-monorepo/order';

export class OrderResponseDTO {
  id: string;
  items: OrderItemDTO[];
  status: string;
}
