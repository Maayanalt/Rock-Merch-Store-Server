import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartDetails } from './entities/cartDetails.entity';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartDetails]), ItemsModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
