// apps/order-service/src/infrastructure/database/order-database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './order.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'cornal_order_db',
      entities: [OrderOrmEntity],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([OrderOrmEntity]),
  ],
  exports: [TypeOrmModule],
})
export class OrderDatabaseModule {}
