import { Module } from '@nestjs/common';
import {
  CreateOrderUseCase,
  OrderRepositoryImpl,
  KafkaOrderEventPublisher,
} from '@cornal-nest-nx-monorepo/order';
import { OrderController } from './adapters/order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'KAFKA_SERVICE',
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           brokers: ['localhost:9092'],
  //         },
  //         consumer: {
  //           groupId: 'order-consumer',
  //         },
  //       },
  //     },
  //   ]),
  // ],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderRepositoryImpl,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: KafkaOrderEventPublisher,
      useClass: KafkaOrderEventPublisher,
    },
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
export class OrderModule {}
