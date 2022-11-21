import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderDetails } from './entities/orderDetails.entity';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    private itemsService: ItemsService,
    private cartService: CartService,
  ) {}

  async createOrder(createOrderDto: OrderDto, userID: number) {
    const orderDate = new Date();
    const requiredDate = new Date();
    requiredDate.setDate(orderDate.getDate() + 14);
    const order = this.ordersRepository.create({
      ...createOrderDto,
      user: { id: userID },
      orderDate,
      requiredDate,
    });
    const submitedOrder = await this.ordersRepository.save(order);
    return submitedOrder;
  }

  async createOrderDetails(createOrderDto: OrderDto, userID: number) {
    const { id: cartId } = await this.cartService.findOne(userID);
    const cartDetails = await this.cartService.findCartDetails(cartId);
    const order = await this.createOrder(createOrderDto, userID);
    for (const item of cartDetails) {
      const {
        item: { id: itemId, price },
        quantity,
        size,
      } = item;
      const itemOrderDetails = this.orderDetailsRepository.create({
        quantity,
        size,
        item: { id: itemId },
        order,
        totalPrice: quantity * price,
      });
      this.orderDetailsRepository.save(itemOrderDetails);
    }
    await this.cartService.removeAllCartDetails(cartId);
    this.cartService.removeCart(userID);
  }

  findAll(id: number) {
    return this.ordersRepository.find({
      where: { user: { id } },
    });
  }

  async findOrderDetails(id: number) {
    const orderItems = await this.orderDetailsRepository.find({
      where: { order: { id } },
      relations: ['item'],
    });
    const newOrderItems = [];
    for (const oneItem of orderItems) {
      const item = await this.itemsService.getOneItem(oneItem.item.id);
      const newItem = this.orderDetailsRepository.create({
        ...oneItem,
        item,
      });
      newOrderItems.push(newItem);
    }
    return newOrderItems;
  }
}
