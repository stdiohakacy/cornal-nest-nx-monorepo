import { Consumer, Kafka } from 'kafkajs';

export class KafkaConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly topic: string;
  private readonly clientId: string = 'payment-service';
  private readonly brokers: string[] = ['localhost:9092'];
  private isConnected = false;

  constructor(topic: string) {
    this.topic = topic;
    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers,
      retry: { initialRetryTime: 300, retries: 10 },
    });

    this.consumer = this.kafka.consumer({ groupId: 'payment-group' });
  }

  async connect() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
      this.isConnected = true;
      console.log(
        `[Kafka] Connected to broker. Subscribed to topic: ${this.topic}`
      );
    } catch (error) {
      console.error(`[Kafka] Error connecting to Kafka:`, error);
      throw error;
    }
  }

  async run(callback: (message: any) => Promise<void>) {
    if (!this.isConnected) {
      await this.connect();
    }

    await this.consumer.run({
      eachMessage: async ({ message, topic, partition }) => {
        try {
          if (message.value) {
            const event = JSON.parse(message.value?.toString() || '{}');
            console.log(
              `[Kafka] Received message from topic ${topic}, partition ${partition}`
            );
            await callback(event);
          }
        } catch (error) {
          console.error(
            `[Kafka] Error processing message from topic ${topic}:`,
            error
          );
        }
      },
    });
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      console.log(`[Kafka] Consumer disconnected.`);
    } catch (error) {
      console.error(`[Kafka] Error during disconnect:`, error);
      throw error;
    }
  }

  async shutdown() {
    console.log(`[Kafka] Shutting down consumer...`);
    await this.disconnect();
  }
}
