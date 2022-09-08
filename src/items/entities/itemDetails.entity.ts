import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class ItemDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Items, (item) => item.sizes)
  item: Items;

  @Column({ length: 10, nullable: true })
  size: string;

  @Column({ name: 'units_in_stock', nullable: true })
  unitsInStock: number;
}
