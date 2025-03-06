import { CreateOrderUseCase } from '@cornal-nest-nx-monorepo/order';
import { Body, Controller, Post } from '@nestjs/common';
import { OrderAggregate } from '@cornal-nest-nx-monorepo/order';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto): Promise<OrderAggregate> {
    return this.createOrderUseCase.execute(dto);
  }
}
