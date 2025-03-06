import { InjectRepository } from '@nestjs/typeorm';
import { OrderOrmEntity } from './order.orm-entity';
import { Repository } from 'typeorm';
import { OrderAggregate } from 'libs/order/src/domain/aggregate-roots/order.aggregate';
import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '@cornal-nest-nx-monorepo/order';

@Injectable()
export class OrderRepositoryImpl implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly ormRepository: Repository<OrderOrmEntity>
  ) {}

  async findById(id: string): Promise<OrderAggregate | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return new OrderAggregate(ormEntity.id, ormEntity.items, 'CREATED');
  }

  async save(order: OrderAggregate): Promise<void> {
    const ormEntity = new OrderOrmEntity();

    ormEntity.id = order.id;
    ormEntity.items = order.items;
    ormEntity.status = order.status;

    await this.ormRepository.save(ormEntity);
  }
}
