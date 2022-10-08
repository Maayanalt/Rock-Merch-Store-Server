import { forwardRef, Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { ItemsModule } from 'src/items/items.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    ItemsModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
