import { NestFactory } from '@nestjs/core';
import { OrderModule } from './app/order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'order-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Order Service is running on port 3000');
}
bootstrap();
