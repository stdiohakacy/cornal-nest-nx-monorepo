import { InjectRepository } from '@nestjs/typeorm';
import { OrderOrmEntity } from './entities/order.orm-entity';
import { Repository } from 'typeorm';
import { OrderAggregate } from 'libs/order/src/domain/aggregate-roots/order.aggregate';
import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '@cornal-nest-nx-monorepo/order';
import { OrderPersistenceMapper } from '../../mappers/order.persistence-mapper';

@Injectable()
export class OrderRepositoryImpl implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepository: Repository<OrderOrmEntity>
  ) {}

  async findAll(): Promise<OrderAggregate[]> {
    const entities = await this.orderRepository.find({ relations: ['items'] });
    return entities.map(OrderPersistenceMapper.toDomain);
  }

  async findById(id: string): Promise<OrderAggregate | null> {
    const entity = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    return entity ? OrderPersistenceMapper.toDomain(entity) : null;
  }

  async save(order: OrderAggregate): Promise<void> {
    const entity = OrderPersistenceMapper.toPersistence(order);
    await this.orderRepository.save(entity);
  }

  async deleteById(id: string): Promise<void> {
    await this.orderRepository.delete({ id });
  }
}
