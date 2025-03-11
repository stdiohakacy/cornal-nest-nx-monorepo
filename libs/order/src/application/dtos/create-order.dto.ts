import { OrderItemDTO } from '@cornal-nest-nx-monorepo/order';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
