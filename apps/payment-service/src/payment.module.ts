import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  CreatePaymentUseCase,
  KafkaPaymentEventPublisher,
  PaymentRepositoryImpl,
} from '@cornal-nest-nx-monorepo/payment';
import { PaymentEventConsumer } from './adapters/event-consumers/payment-event.consumer';

@Module({
  controllers: [],
  providers: [
    PaymentRepositoryImpl,
    KafkaPaymentEventPublisher,
    PaymentEventConsumer,
    {
      provide: CreatePaymentUseCase,
      useFactory: (
        paymentRepository: PaymentRepositoryImpl,
        eventPublisher: KafkaPaymentEventPublisher
      ) => new CreatePaymentUseCase(paymentRepository, eventPublisher),
      inject: [PaymentRepositoryImpl, KafkaPaymentEventPublisher],
    },
    {
      provide: PaymentEventConsumer,
      useFactory: (createPaymentUseCase: CreatePaymentUseCase) =>
        new PaymentEventConsumer(createPaymentUseCase),
      inject: [CreatePaymentUseCase],
    },
  ],
  exports: [CreatePaymentUseCase],
})
export class PaymentModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly eventPublisher: KafkaPaymentEventPublisher,
    private readonly paymentEventConsumer: PaymentEventConsumer
  ) {}

  async onModuleInit() {
    await this.eventPublisher.start();
    await this.paymentEventConsumer.onModuleInit();
  }

  async onModuleDestroy() {
    await this.eventPublisher.stop();
  }
}
