import { Kafka, Producer } from 'kafkajs';
import { OrderEventPublisherInterface } from '@cornal-nest-nx-monorepo/order';

export class KafkaOrderEventPublisher implements OrderEventPublisherInterface {
  private kafka: Kafka;
  private producer: Producer;
  private readonly topic = 'order-created';

  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-service',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async start(): Promise<void> {
    try {
      await this.producer.connect();
      console.log('[Kafka] Producer connected');
    } catch (error) {
      console.error(`[Kafka] Error connecting producer: `, error);
    }
  }

  async publishOrderCreatedEvent(
    orderId: string,
    items: { productId: string; quantity: number; price: number }[]
  ): Promise<void> {
    try {
      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            key: orderId,
            value: JSON.stringify({ orderId, items }),
          },
        ],
      });
      console.log(`[Kafka] OrderCreated event sent: ${orderId}`);
    } catch (error) {
      console.error(`[Kafka] Error sending event for order ${orderId}:`, error);
    }
  }

  async stop(): Promise<void> {
    try {
      await this.producer.disconnect();
      console.log('[Kafka] Producer disconnected');
    } catch (error) {
      console.error(`[Kafka] Error disconnecting producer: `, error);
    }
  }
}
