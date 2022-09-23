import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;
}
