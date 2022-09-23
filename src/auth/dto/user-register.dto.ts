import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../user/enum/UserRoles';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoles)
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
