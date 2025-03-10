import { CreateOrderUseCase } from '@cornal-nest-nx-monorepo/order';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { OrderResponseDTO } from '../dtos/order-response.dto';
import { OrderDTOMapper } from '../mappers/order.dto-mapper';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    const order = await this.createOrderUseCase.execute(dto);
    return OrderDTOMapper.toDTO(order);
  }
}
