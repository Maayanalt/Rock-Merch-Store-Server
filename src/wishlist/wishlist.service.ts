import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistDto } from './wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private itemsService: ItemsService,
    private usersService: UsersService,
  ) {}

  async create(WishlistDto: WishlistDto) {
    const { userId, itemId } = WishlistDto;
    const user = await this.usersService.find(userId);
    const item = await this.itemsService.findOne(itemId);
    const wishlist = this.wishlistRepository.create({ user, item });
    return this.wishlistRepository.save(wishlist);
  }

  async findItems(id: number) {
    const wishlist = await this.wishlistRepository.find({
      where: { user: { id } },
      relations: ['item'],
    });
    const newItems = [];
    for (const oneItem of wishlist) {
      const item = await this.itemsService.getOneItem(oneItem.item.id);
      const newItem = this.wishlistRepository.create({
        item,
      });
      newItems.push(newItem);
    }
    return newItems;
  }
}
