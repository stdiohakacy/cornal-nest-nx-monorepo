import { IsString } from 'class-validator';

export class OrderStatusDTO {
  @IsString()
  status: string;
}
