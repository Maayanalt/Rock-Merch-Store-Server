import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/categories')
  getAllCategories() {
    return this.itemsService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.getOneItem(+id);
  }

  @Get()
  findAll() {
    return this.itemsService.getAll();
  }
}
