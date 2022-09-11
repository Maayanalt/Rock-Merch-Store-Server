import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entity';
import { Photos } from './entities/photos.entity';
import { ItemDetails } from './entities/itemDetails.entity';
import { Categories } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Items, Photos, ItemDetails, Categories])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
