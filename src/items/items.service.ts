import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Categories } from './entities/categories.entity';
import { Items } from './entities/items.entity';
import { ItemDetails } from './entities/itemDetails.entity';
import { Photos } from './entities/photos.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private itemsRepository: Repository<Items>,
    @InjectRepository(Photos) private photoRepository: Repository<Photos>,
    @InjectRepository(ItemDetails)
    private detailsRepository: Repository<ItemDetails>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getOneItem(id: number): Promise<Items> {
    const item = await this.itemsRepository.findOne({ id });
    const images = await this.photoRepository.find({
      where: { item: { id } },
      select: ['src', 'alt'],
    });
    const sizes = await this.detailsRepository.find({
      where: { item: { id } },
      select: ['size', 'unitsInStock'],
    });
    const newItem = this.itemsRepository.create({
      ...item,
      images,
      sizes,
    });

    return newItem;
  }

  getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find({
      where: { parentCategory: null },
      relations: ['childCategories'],
    });
  }

  findOne(id: number): Promise<Items> {
    return this.itemsRepository.findOne(id);
  }

  async organizeItems(items: Items[]) {
    const newItems = [];
    for (const item of items) {
      const newItem = await this.getOneItem(item.id);
      newItems.push(newItem);
    }

    return newItems;
  }

  async getBestSellerItems(page: number, limit: number): Promise<Items[]> {
    return this.itemsRepository
      .createQueryBuilder('item')
      .leftJoin('item.orderDetails', 'order_details')
      .select('SUM(order_details.quantity)', 'sum')
      .addSelect('item.id', 'id')
      .groupBy('id')
      .orderBy('sum', 'DESC')
      .addOrderBy('id', 'ASC')
      .offset(page * limit)
      .limit(limit)
      .getRawMany();
  }

  async getBestSellerCategoryItems(
    page: number,
    limit: number,
    categoryID: number,
    parent = false,
  ): Promise<Items[]> {
    const whereColumn = parent ? 'categories.parentCategory' : 'categories.id';
    return this.itemsRepository
      .createQueryBuilder('item')
      .leftJoin('item.category', 'categories')
      .leftJoin('item.orderDetails', 'order_details')
      .select('SUM(order_details.quantity)', 'sum')
      .addSelect('item.id', 'id')
      .where(`${whereColumn} = :id`, { id: categoryID })
      .groupBy('id')
      .orderBy('sum', 'DESC')
      .addOrderBy('id', 'ASC')
      .offset(page * limit)
      .limit(limit)
      .getRawMany();
  }

  async getBestSellerItemsSearch(
    stringForSearch: string,
    page: number,
    limit: number,
  ): Promise<Items[]> {
    return this.itemsRepository
      .createQueryBuilder('item')
      .leftJoin('item.orderDetails', 'order_details')
      .select('SUM(order_details.quantity)', 'sum')
      .addSelect('item.id', 'id')
      .where('item.name like :search', { search: `%${stringForSearch}%` })
      .orWhere('item.description like :search', {
        search: `%${stringForSearch}%`,
      })
      .groupBy('id')
      .orderBy('sum', 'DESC')
      .addOrderBy('id', 'ASC')
      .offset(page * limit)
      .limit(limit)
      .getRawMany();
  }

  async paginateAllItems(
    limit: number,
    page: number,
  ): Promise<[Items[], number]> {
    const items = await this.getBestSellerItems(page, limit);
    const newItems = await this.organizeItems(items);
    const total = await this.itemsRepository.count();

    return [newItems, total];
  }

  async paginateItemsByCategory(
    categoryID: number,
    limit: number,
    page: number,
  ): Promise<[Items[], number]> {
    const items = await this.getBestSellerCategoryItems(
      page,
      limit,
      categoryID,
    );
    const newItems = await this.organizeItems(items);
    const total = await this.itemsRepository.count({
      where: { category: { id: categoryID } },
      relations: ['category'],
    });

    return [newItems, total];
  }

  async paginateItemsByParentCategory(
    categoryID: number,
    limit: number,
    page: number,
  ): Promise<[Items[], number]> {
    const items = await this.getBestSellerCategoryItems(
      page,
      limit,
      categoryID,
      true,
    );
    const newItems = await this.organizeItems(items);
    const total = await this.itemsRepository.count({
      where: { category: { parentCategory: { id: categoryID } } },
      relations: ['category'],
    });

    return [newItems, total];
  }

  async paginateAllItemsSorted(
    limit: number,
    page: number,
    order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    const [items, total] = await this.itemsRepository.findAndCount({
      order: { price: order },
      take: limit,
      skip: page * limit,
    });
    const newItems = await this.organizeItems(items);

    return [newItems, total];
  }

  async paginateItemsByCategorySorted(
    categoryID: number,
    limit: number,
    page: number,
    order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    const [items, total] = await this.itemsRepository.findAndCount({
      where: { category: { id: categoryID } },
      order: { price: order },
      relations: ['category'],
      take: limit,
      skip: page * limit,
    });
    const newItems = await this.organizeItems(items);

    return [newItems, total];
  }

  async paginateItemsParentCategorySorted(
    categoryID: number,
    limit: number,
    page: number,
    order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    const [items, total] = await this.itemsRepository.findAndCount({
      where: { category: { parentCategory: { id: categoryID } } },
      order: { price: order },
      relations: ['category'],
      take: limit,
      skip: page * limit,
    });
    const newItems = await this.organizeItems(items);

    return [newItems, total];
  }

  async paginateItemsBySearch(
    stringForSearch: string,
    limit: number,
    page: number,
  ): Promise<[Items[], number]> {
    const items = await this.getBestSellerItemsSearch(
      stringForSearch,
      page,
      limit,
    );
    const newItems = await this.organizeItems(items);

    const total = await this.itemsRepository.count({
      where: [
        { name: Like(`%${stringForSearch}%`) },
        { description: Like(`%${stringForSearch}%`) },
      ],
    });

    return [newItems, total];
  }

  async paginateItemsBySearchSort(
    stringForSearch: string,
    limit: number,
    page: number,
    order: 'ASC' | 'DESC',
  ): Promise<[Items[], number]> {
    const [items, total] = await this.itemsRepository.findAndCount({
      where: [
        { name: Like(`%${stringForSearch}%`) },
        { description: Like(`%${stringForSearch}%`) },
      ],
      order: { price: order },
      take: limit,
      skip: page * limit,
    });
    const newItems = await this.organizeItems(items);

    return [newItems, total];
  }
}
