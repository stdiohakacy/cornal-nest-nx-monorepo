import { Module } from '@nestjs/common';
import {
  CreateOrderUseCase,
  OrderRepositoryImpl,
} from '@cornal-nest-nx-monorepo/order';
import { OrderController } from '../adapters/order.controller';
@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderRepositoryImpl,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepository: OrderRepositoryImpl) =>
        new CreateOrderUseCase(orderRepository),
      inject: [OrderRepositoryImpl],
    },
  ],
})
export class OrderModule {}
