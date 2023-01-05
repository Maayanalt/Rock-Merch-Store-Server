import { Cart } from 'src/cart/entities/cart.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { ResetPassword } from 'src/reset-password/entities/reset-password.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  firstName: string;

  @Column({ length: 30, nullable: false })
  lastName: string;

  @Column({ length: 45, nullable: false })
  email: string;

  @Column({ type: 'char', length: 255, nullable: false, select: false })
  password: string;

  @Column({ length: 50, nullable: true })
  address: string | undefined;

  @Column({ length: 20, nullable: true })
  city: string | undefined;

  @Column({ length: 20, nullable: true })
  postalCode: string | undefined;

  @Column({ length: 20, nullable: true })
  country: string | undefined;

  @Column({ length: 25, nullable: true })
  phone: string | undefined;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Wishlist, (wihslist) => wihslist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToMany(() => ResetPassword, (reset) => reset.user)
  resetPassword: ResetPassword[];
}
