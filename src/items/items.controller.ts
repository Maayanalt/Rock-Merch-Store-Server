import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Items } from './entities/items.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/categories')
  getAllCategories() {
    return this.itemsService.getCategories();
  }

  @Get('category/parent/:id')
  async paginateCategoryParent(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateItemsByParentCategory(
      +id,
      limit,
      page - 1,
    );
  }

  @Get('category/:id')
  async paginateCategory(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateItemsByCategory(+id, limit, page - 1);
  }

  @Get('/sorted/category/parent/:id')
  async paginateParentCategorySort(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('order') order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateItemsParentCategorySorted(
      +id,
      limit,
      page - 1,
      order,
    );
  }

  @Get('/sorted/category/:id')
  async paginateCategorySort(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('order') order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateItemsByCategorySorted(
      +id,
      limit,
      page - 1,
      order,
    );
  }

  @Get('/sorted')
  async paginateAllSort(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('order') order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateAllItemsSorted(limit, page - 1, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.getOneItem(+id);
  }

  @Get()
  async paginateAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<[Items[], number]> {
    limit = limit > 20 ? 20 : limit;
    return this.itemsService.paginateAllItems(limit, page - 1);
  }
}
