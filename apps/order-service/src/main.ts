import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(3000);
}

bootstrap();
