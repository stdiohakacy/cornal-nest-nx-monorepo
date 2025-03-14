import {
  ArrayNotEmpty,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderItemDTO } from './order-item.dto';
import { OrderStatusDTO } from './order-status.dto';
import { Type } from 'class-transformer';

export class OrderDTO {
  @IsUUID()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  status: OrderStatusDTO;
}
