import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
