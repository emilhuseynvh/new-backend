import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Length, MinLength } from 'class-validator';

export class AuthLoginDto {
  @Type()
  @IsString()
  @Length(3, 30)
  @ApiProperty({ default: 'john' })
  username: string;

  @Type()
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: 123456 })
  password: string;
}
