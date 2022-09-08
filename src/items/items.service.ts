import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getAll(): Promise<Items[]> {
    const items = await this.itemsRepository.find();
    const newItems = [];
    for (const item of items) {
      const images = await this.photoRepository.find({
        where: { item: { id: item.id } },
        select: ['src', 'alt'],
      });
      const sizes = await this.detailsRepository.find({
        where: { item: { id: item.id } },
        select: ['size', 'unitsInStock'],
      });
      const newItem = this.itemsRepository.create({
        ...item,
        images,
        sizes,
      });
      newItems.push(newItem);
    }
    return newItems;
  }

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find({
      where: { parentCategory: null },
      relations: ['childCategories'],
    });
  }
}
