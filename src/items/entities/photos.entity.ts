import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  src: string;

  @Column({ length: 55 })
  alt: string;

  @ManyToOne(() => Items, (item) => item.images)
  item: Items;
}
