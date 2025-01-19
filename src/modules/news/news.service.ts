import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entity/News.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { DeleteNewsDto } from './dto/delete-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepo: Repository<NewsEntity>,
  ) {}

  async list() {
    return await this.newsRepo.find({ relations: { category: true } });
  }

  async create(params: CreateNewsDto) {
    const news = this.newsRepo.create(params);

    await news.save();

    return news;
  }

  async deleteNews(id: DeleteNewsDto) {
    const news = await this.newsRepo.delete(id);

    if (!news.affected) throw new NotFoundException('news is not found');

    return { message: 'news deleted succesfully' };
  }

  async updateNews(id: number, params: CreateNewsDto) {
    console.log('existUser');
    const existUser = await this.newsRepo.findOne({ where: { id } });

    if (!existUser) throw new NotFoundException('news is not found');

    const updatedNews = {
      ...existUser,
      title: params.title,
      thumbnail: params.thumbnail,
      slug: params.slug && params.slug,
      content: params.content,
    };

    await this.newsRepo.save(updatedNews);

    return { message: 'news updated succesfully', news: updatedNews };
  }
}
