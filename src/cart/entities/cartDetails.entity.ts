import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Items } from 'src/items/entities/items.entity';

@Entity()
export class CartDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint' })
  quantity: number;

  @Column({ length: 10, nullable: true })
  size: string;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails)
  cart: Cart;

  @ManyToOne(() => Items, (item) => item.cartDetails)
  item: Items;
}
