import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CustomerModule, OrdersModule, TypeOrmModule.forRoot(typeORMConfig), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
