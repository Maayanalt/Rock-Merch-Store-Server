import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
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
  ) {}

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
