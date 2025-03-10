import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: OrderOrmEntity;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  currency: string;
}
