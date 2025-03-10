import { OrderAggregate } from '@cornal-nest-nx-monorepo/order';
import { OrderResponseDTO } from '../dtos/order-response.dto';

export class OrderDTOMapper {
  static toDTO(order: OrderAggregate): OrderResponseDTO {
    return {
      id: order.id,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.amount,
        currency: item.price.currency,
      })),
      status: order.status.getValue(),
    };
  }
}
