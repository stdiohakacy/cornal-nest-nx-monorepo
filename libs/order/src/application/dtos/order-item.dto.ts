import { IsNumber, IsString } from 'class-validator';

export class OrderItemDTO {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;
}
