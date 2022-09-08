import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';
import { ItemDetails } from './entities/itemDetails.entity';
import { Photos } from './entities/photos.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Photos) private photoRepository: Repository<Photos>,
    @InjectRepository(ItemDetails)
    private detailsRepository: Repository<ItemDetails>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Item[]> {
    const items = await this.itemRepository.find();
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
      const newItem = this.itemRepository.create({
        ...item,
        images,
        sizes,
      });
      newItems.push(newItem);
    }
    return newItems;
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['childCategories'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
