import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateOrderUseCase } from '@cornal-nest-nx-monorepo/order';
import { OrderController } from './adapters/controllers/order.controller';
import { KafkaOrderEventPublisher } from './infrastructure/messaging/kafka-order-event.publisher';
import { OrderRepositoryInMemoryImpl } from './infrastructure/database/inmemory/order.repository.inmemory.impl';
import { OrderRepositoryImpl } from './infrastructure/database/postgres/order.repository.impl';
import { OrderDatabaseModule } from './infrastructure/database/postgres/order-database.module';
@Module({
  imports: [OrderDatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderRepositoryInMemoryImpl,
    KafkaOrderEventPublisher,
    {
      provide: 'ORDER_REPOSITORY',
      useClass: OrderRepositoryImpl,
    },
    // {
    //   provide: CreateOrderUseCase,
    //   useFactory: (
    //     orderRepository: OrderRepositoryInMemoryImpl,
    //     eventPublisher: KafkaOrderEventPublisher
    //   ) => new CreateOrderUseCase(orderRepository, eventPublisher),
    //   inject: [OrderRepositoryInMemoryImpl, KafkaOrderEventPublisher],
    // },
    {
      provide: CreateOrderUseCase,
      useFactory: (
        orderRepository: OrderRepositoryImpl,
        eventPublisher: KafkaOrderEventPublisher
      ) => new CreateOrderUseCase(orderRepository, eventPublisher),
      inject: ['ORDER_REPOSITORY', KafkaOrderEventPublisher],
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
