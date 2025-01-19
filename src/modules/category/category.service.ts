import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entity/Category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async list() {
    const categories = await this.categoryRepo.find();

    return categories;
  }

  async create(params: CreateCategoryDto) {
    const category = this.categoryRepo.create(params);

    await category.save();

    return category;
  }

  async deleteCategory(params: DeleteCategoryDto) {
    const deletedCategory = await this.categoryRepo.delete(params.id);

    if (!deletedCategory.affected)
      throw new NotFoundException('category not found');

    return { message: 'category deleted succesfully' };
  }

  async update(id: number, params: CreateCategoryDto) {
    const existCategory = await this.categoryRepo.findOne({ where: { id } });
    console.log(existCategory);

    if (!existCategory) throw new NotFoundException('category is not found');

    const updatedCategory = {
      ...existCategory,
      name: params.name,
      slug: params.slug && params.slug,
    };

    await this.categoryRepo.save(updatedCategory);

    return updatedCategory;
  }
}
