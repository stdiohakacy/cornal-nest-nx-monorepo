import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderItemOrmEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItemOrmEntity[];

  @Column()
  status: string;
}
