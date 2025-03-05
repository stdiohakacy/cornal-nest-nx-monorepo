import { NestFactory } from '@nestjs/core';
import { OrderModule } from './app/order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(3000);
}
bootstrap();
