import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Items } from 'src/items/entities/items.entity';

@Entity()
export class CartDetails {
  @Column({ type: 'tinyint' })
  quantity: number;

  @Column({ length: 10, nullable: true })
  size: string;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails, { primary: true })
  cart: Cart;

  @ManyToOne(() => Items, (item) => item.cartDetails, { primary: true })
  item: Items;
}
