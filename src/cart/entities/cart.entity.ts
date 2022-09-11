import { Users } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartDetails } from './cartDetails.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modifiedDate: Date;

  @OneToOne(() => Users, (user) => user.cart)
  @JoinColumn()
  user: Users;

  @OneToMany(() => CartDetails, (cartDetails) => cartDetails.cart)
  cartDetails: CartDetails[];
}
