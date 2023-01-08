import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/categories')
  getAllCategories() {
    return this.itemsService.getCategories();
  }

  @Get('category/parent/:id')
  findByParentCategory(@Param('id') id: string) {
    return this.itemsService.getItemsByParentCategory(+id);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.itemsService.getItemsByCategory(+id);
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
