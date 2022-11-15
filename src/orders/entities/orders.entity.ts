// eslint-disable-next-line prettier/prettier
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './orderDetails.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'datetime', name: 'order_date' })
  orderDate: number;

  @Column({ nullable: false, name: 'required_date', type: 'date' })
  requiredDate: Date;

  @Column({ name: 'shipped_date', type: 'date' })
  shippedDate: Date;

  @Column({ length: 50, nullable: false })
  address: string;

  @Column({ length: 20, nullable: false })
  city: string;

  @Column({ length: 20, nullable: false, name: 'postal_code' })
  postalCode: string;

  @Column({ length: 20, nullable: false })
  country: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    name: 'total_cost',
    nullable: false,
  })
  totalCost: number;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];
}
