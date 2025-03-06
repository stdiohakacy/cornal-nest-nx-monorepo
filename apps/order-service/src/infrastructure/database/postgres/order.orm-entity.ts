import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb' })
  items: { productId: string; quantity: number }[];

  @Column()
  status: string; // CREATED | CONFIRMED | CANCELED
}
