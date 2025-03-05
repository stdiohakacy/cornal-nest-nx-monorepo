import { Kafka, Producer } from 'kafkajs';
import { PaymentEventPublisher } from 'libs/payment/src/application/ports/payment-event.publisher.interface';

export class KafkaPaymentEventPublisher implements PaymentEventPublisher {
  private kafka: Kafka;
  private producer: Producer;
  private readonly topic = 'payment-completed';

  constructor() {
    this.kafka = new Kafka({
      clientId: 'payment-service',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async publishPaymentCompleted(
    paymentId: string,
    orderId: string,
    amount: number
  ): Promise<void> {
    try {
      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            key: paymentId,
            value: JSON.stringify({ paymentId, orderId, amount }),
          },
        ],
      });
      console.log(`[Kafka] PaymentCompleted event sent: ${paymentId}`);
    } catch (error) {
      console.error(
        `[Kafka] Error sending event for payment ${paymentId}:`,
        error
      );
    }
  }

  async start(): Promise<void> {
    try {
      await this.producer.connect();
      console.log('[Kafka] Producer connected');
    } catch (error) {
      console.error(`[Kafka] Error connecting producer: `, error);
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
