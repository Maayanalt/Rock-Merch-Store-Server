import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { ItemsModule } from 'src/items/items.module';
import { Orders } from './entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails]), ItemsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
