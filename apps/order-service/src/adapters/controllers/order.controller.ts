import { CreateOrderUseCase } from '@cornal-nest-nx-monorepo/order';
import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateOrderDTO,
  OrderResponseDTO,
} from '@cornal-nest-nx-monorepo/order';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    return await this.createOrderUseCase.execute(dto);
  }
}
