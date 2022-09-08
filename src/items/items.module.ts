import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Photos } from './entities/photos.entity';
import { ItemDetails } from './entities/itemDetails.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Photos, ItemDetails, Category])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
