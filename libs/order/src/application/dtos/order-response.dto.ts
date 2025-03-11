import { Type } from 'class-transformer';
import {
  IsUUID,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  IsString,
} from 'class-validator';
import { OrderItemDTO } from './order-item.dto';

export class OrderResponseDTO {
  @IsUUID()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @IsString()
  status: string;
}
