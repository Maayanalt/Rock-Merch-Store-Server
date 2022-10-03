import { Items } from 'src/items/entities/items.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist {
  @ManyToOne(() => Users, (user) => user.wishlist, { primary: true })
  user: Users;

  @ManyToOne(() => Items, (item) => item.wishlist, { primary: true })
  item: Items;
}
