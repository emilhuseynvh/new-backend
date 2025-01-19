import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeleteNewsDto } from './dto/delete-news.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRoles } from '../user/user.types';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) { }

  @Get()
  list() {
    return this.newsService.list();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  async create(@Body() body: CreateNewsDto) {
    return await this.newsService.create(body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  @ApiParam({
    name: 'id',
    description: 'ID of the news to delete',
    required: true,
    type: Number,
  })
  deleteNews(@Param() params: DeleteNewsDto) {
    return this.newsService.deleteNews(params);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  @ApiParam({
    name: 'id',
    description: 'ID of the news to delete',
    required: true,
    type: Number,
  })
  update(@Param() params: DeleteNewsDto, @Body() body: CreateNewsDto) {
    return this.newsService.updateNews(params.id, body);
  }
}
