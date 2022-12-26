import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { CartDto } from './dto/cart.dto';
import { CreateCartDetailsDto } from './dto/createCartDetails.dto';
import { UpdateCartDetailsDto } from './dto/updateCartDetails.dto';
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

  createCart(cartDto: CartDto) {
    const { userID, modifiedDate } = cartDto;
    const cart = this.cartRepository.create({
      modifiedDate,
      user: { id: userID },
    });
    return this.cartRepository.save(cart);
  }

  async duplicatesInCart(
    cartDetailsDto: UpdateCartDetailsDto,
    userID: number,
    modifiedDate: Date,
  ) {
    const { itemID, size, quantity, cartDetailID } = cartDetailsDto;
    const cart = await this.findOne(userID);
    const itemCart = await this.findItem(itemID, size, cart);
    await this.removeCartDetails(cartDetailID, userID, modifiedDate);
    this.updateCartDetails(
      {
        cartDetailID: itemCart.id,
        size,
        quantity: Number(quantity),
        itemID,
      },
      userID,
      modifiedDate,
    );
  }

  async itemAlreadyInCart(
    cartDetailsDto: CreateCartDetailsDto,
    userID: number,
    modifiedDate: Date,
  ) {
    const { itemID, size, quantity } = cartDetailsDto;
    const cart = await this.findOne(userID);
    const itemCart = await this.findItem(itemID, size, cart);
    if (itemCart) {
      this.updateCartDetails(
        {
          cartDetailID: itemCart.id,
          quantity: Number(itemCart.quantity) + Number(quantity),
          size,
          itemID,
        },
        userID,
        modifiedDate,
      );
      return true;
    }
    return false;
  }

  findItem(itemId: number, size: string, cart: Cart) {
    return this.cartDetailsRepository.findOne({
      where: { item: { id: itemId }, size, cart },
    });
  }

  async createCartDetails(
    cartDetailsDto: CreateCartDetailsDto,
    userID: number,
    modifiedDate: Date,
  ) {
    const { itemID, quantity, size } = cartDetailsDto;
    if (await this.itemAlreadyInCart(cartDetailsDto, userID, modifiedDate)) {
      return;
    }
    let cart = await this.findOne(userID);
    if (!cart) cart = await this.createCart({ userID, modifiedDate });
    else this.updateCart(cart.id, modifiedDate);
    const item = await this.itemsService.findOne(itemID);
    const cartDetails = this.cartDetailsRepository.create({
      cart,
      item,
      size,
      quantity,
    });
    this.cartDetailsRepository.save(cartDetails);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne({
      where: { user: { id } },
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

  updateCart(id: number, modifiedDate: Date) {
    this.cartRepository.update(id, { modifiedDate });
  }

  async updateCartDetails(
    cartDetailsDto: UpdateCartDetailsDto,
    userID: number,
    modifiedDate: Date,
  ) {
    const { cartDetailID, quantity, size } = cartDetailsDto;
    const cart = await this.findOne(userID);
    this.updateCart(cart.id, modifiedDate);
    this.cartDetailsRepository.update({ id: cartDetailID }, { quantity, size });
  }

  async removeCartDetails(
    cartDetailID: number,
    userID: number,
    modifiedDate: Date,
  ) {
    const cart = await this.findOne(userID);
    this.updateCart(cart.id, modifiedDate);
    return this.cartDetailsRepository.delete({ id: cartDetailID });
  }

  async removeCart(id: number) {
    return this.cartRepository.delete({ user: { id } });
  }

  async removeAllCartDetails(id: number) {
    return this.cartDetailsRepository.delete({ cart: { id } });
  }
}
