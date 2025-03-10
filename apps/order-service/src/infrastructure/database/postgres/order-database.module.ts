import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './entities/order.orm-entity';
import { OrderItemOrmEntity } from './entities/order-item.orm-entity';
import postgresConfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...postgresConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]),
  ],
  exports: [TypeOrmModule],
})
export class OrderDatabaseModule {}
