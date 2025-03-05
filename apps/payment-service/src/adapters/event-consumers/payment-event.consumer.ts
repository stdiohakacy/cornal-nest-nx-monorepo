import {
  CreatePaymentUseCase,
  KafkaConsumerService,
} from '@cornal-nest-nx-monorepo/payment';
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

export class PaymentEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentEventConsumer.name);
  private readonly kafkaConsumer: KafkaConsumerService;

  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {
    this.kafkaConsumer = new KafkaConsumerService('order-created');
  }

  async onModuleInit() {
    try {
      this.logger.log(
        '🔄 Starting Kafka consumer for "order-created" topic...'
      );
      await this.kafkaConsumer.run(async (event) => {
        try {
          this.logger.log(
            `🛠 Received order event: ${event.orderId}, amount: ${event.amount}`
          );
          await this.createPaymentUseCase.execute(event.orderId, event.amount);
        } catch (error) {
          this.logger.error(
            `❌ Error processing payment event: ${error.message}`,
            error.stack
          );
        }
      });
    } catch (error) {
      this.logger.error(
        `❌ Kafka consumer failed to start: ${error.message}`,
        error.stack
      );
    }
  }

  async onModuleDestroy() {
    this.logger.log('🔌 Disconnecting Kafka consumer...');
    await this.kafkaConsumer.shutdown();
  }
}
