import { Items } from 'src/items/entities/items.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class OrderDetails {
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    name: 'total_price',
    nullable: false,
  })
  totalPrice: number;

  @Column({ type: 'tinyint' })
  quantity: number;

  @Column({ length: 10, nullable: true })
  size: string;

  @ManyToOne(() => Orders, (order) => order.orderDetails, { primary: true })
  order: Orders;

  @ManyToOne(() => Items, (item) => item.orderDetails, { primary: true })
  item: Items;
}
