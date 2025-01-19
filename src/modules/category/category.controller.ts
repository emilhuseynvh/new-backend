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
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRoles } from '../user/user.types';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  list() {
    return this.categoryService.list();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  @ApiParam({
    name: 'id',
    description: 'ID of the category to delete',
    required: true,
    type: Number,
  })
  deleteCategory(@Param() params: DeleteCategoryDto) {
    return this.categoryService.deleteCategory(params);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRoles.ADMIN,])
  @ApiParam({
    name: 'id',
    description: 'ID of the category to delete',
    required: true,
    type: Number,
  })
  update(@Param() param: DeleteCategoryDto, @Body() body: CreateCategoryDto) {
    return this.categoryService.update(param.id, body);
  }
}
