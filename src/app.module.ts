import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { typeORMAsyncConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UsersModule } from './users/users.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeORMAsyncConfig),
    ItemsModule,
    UsersModule,
    CartModule,
    WishlistModule,
    OrdersModule,
    ResetPasswordModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
