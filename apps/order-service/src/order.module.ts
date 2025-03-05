import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  CreateOrderUseCase,
  OrderRepositoryImpl,
  KafkaOrderEventPublisher,
} from '@cornal-nest-nx-monorepo/order';
import { OrderController } from './adapters/order.controller';
@Module({
  controllers: [OrderController],
  providers: [
    OrderRepositoryImpl,
    KafkaOrderEventPublisher,
    {
      provide: CreateOrderUseCase,
      useFactory: (
        orderRepository: OrderRepositoryImpl,
        eventPublisher: KafkaOrderEventPublisher
      ) => new CreateOrderUseCase(orderRepository, eventPublisher),
      inject: [OrderRepositoryImpl, KafkaOrderEventPublisher],
    },
  ],
})
export class OrderModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly eventPublisher: KafkaOrderEventPublisher) {}

  async onModuleInit() {
    await this.eventPublisher.start();
  }

  async onModuleDestroy() {
    await this.eventPublisher.stop();
  }
}
