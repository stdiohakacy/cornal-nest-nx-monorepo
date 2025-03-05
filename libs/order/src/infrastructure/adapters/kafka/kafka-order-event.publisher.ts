import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { OrderEventPublisherInterface } from 'libs/order/src/application/ports/order-event.publisher.interface';

export class KafkaOrderEventPublisher implements OrderEventPublisherInterface {
  private kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092'],
  });

  private producer = this.kafka.producer();

  async publishOrderCreatedEvent(
    orderId: string,
    items: { productId: string; quantity: number; price: number }[]
  ): Promise<void> {
    await this.producer.connect();
    const test = await this.producer.send({
      topic: 'order-created',
      messages: [
        {
          key: orderId,
          value: JSON.stringify({
            orderId,
            items,
          }),
        },
      ],
    });
    console.log(test);
    await this.producer.disconnect();
  }
}
