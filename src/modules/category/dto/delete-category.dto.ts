import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteCategoryDto {
  @Type()
  @IsNumber()
  id: number;
}
