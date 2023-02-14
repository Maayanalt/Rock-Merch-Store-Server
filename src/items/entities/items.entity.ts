import { CartDetails } from 'src/cart/entities/cartDetails.entity';
import { OrderDetails } from 'src/orders/entities/orderDetails.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { ItemDetails } from './itemDetails.entity';
import { Photos } from './photos.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 55 })
  name: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    name: 'unit_price',
    nullable: false,
  })
  price: number;

  @Column({
    length: 500,
    default: null,
  })
  description: string;

  @OneToMany(() => Photos, (photo) => photo.item)
  images: Photos[];

  @OneToMany(() => ItemDetails, (itemD) => itemD.item)
  sizes: ItemDetails[];

  @ManyToOne(() => Categories, (category) => category.items)
  category: Categories;

  @OneToMany(() => CartDetails, (cartDetails) => cartDetails.item)
  cartDetails: CartDetails[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.item)
  wishlist: Wishlist[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.item)
  orderDetails: OrderDetails[];
}
