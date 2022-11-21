import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createOrder(
    @Body() orderDto: OrderDto,
    @Session() session: Record<string, any>,
  ) {
    return this.ordersService.createOrderDetails(orderDto, session.userID);
  }

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
