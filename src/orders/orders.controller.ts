import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getOneOrder(@Session() session: Record<string, any>) {
    const orders = await this.ordersService.findAll(session.userID);
    const newOrders = [];
    for (const order of orders) {
      const items = await this.ordersService.findOrderDetails(order.id);
      newOrders.push({ ...order, items });
    }
    return newOrders;
  }
}
