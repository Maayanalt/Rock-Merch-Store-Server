import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartDetails } from './entities/cartDetails.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartDetails)
    private cartDetailsRepository: Repository<CartDetails>,
    private itemsService: ItemsService,
  ) {}

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findCartDetails(id: number) {
    const cartItems = await this.cartDetailsRepository.find({
      where: { cart: { id } },
      relations: ['item'],
    });
    const newCartItems = [];
    for (const oneItem of cartItems) {
      const item = await this.itemsService.getOneItem(oneItem.item.id);
      const newItem = this.cartDetailsRepository.create({
        ...oneItem,
        item,
      });
      newCartItems.push(newItem);
    }
    return newCartItems;
  }
}
