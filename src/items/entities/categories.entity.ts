import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @ManyToOne(() => Categories, (category) => category.childCategories)
  parentCategory: Categories;

  @OneToMany(() => Categories, (category) => category.parentCategory)
  childCategories: Categories[];

  @OneToMany(() => Items, (item) => item.id)
  items: Items[];
}
