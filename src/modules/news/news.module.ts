import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entity/News.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), UserModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
