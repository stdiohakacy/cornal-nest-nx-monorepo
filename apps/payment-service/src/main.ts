import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './app/payment.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'payment-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);
  console.log('Payment Service is running on port 4000');
}
bootstrap();
