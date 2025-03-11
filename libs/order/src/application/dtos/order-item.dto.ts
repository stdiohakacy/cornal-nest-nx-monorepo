import { IsNumber, IsString, Min } from 'class-validator';

export class OrderItemDTO {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  currency: string;
}
