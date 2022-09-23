import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}