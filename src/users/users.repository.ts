import { Cart } from 'src/cart/entities/cart.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  async getCart(id: number): Promise<Cart> {
    const user = await this.findOne({
      where: { id },
      relations: ['cart'],
    });
    return user.cart;
  }
}
