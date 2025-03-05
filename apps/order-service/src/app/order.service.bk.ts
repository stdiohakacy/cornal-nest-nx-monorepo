import { Injectable, OnModuleInit } from '@nestjs/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrderService implements OnModuleInit {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('order.created');
    await this.kafkaClient.connect();
    this.logger.log('Connected to Kafka');
  }

  async createOrder(orderData: any) {
    this.logger.log(`Creating order: ${JSON.stringify(orderData)}`);
    return this.kafkaClient.emit('order.created', orderData);
  }
}
