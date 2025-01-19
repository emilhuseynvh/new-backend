import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteNewsDto {
  @Type()
  @IsNumber()
  @ApiProperty({ default: 1 })
  id: number;
}
