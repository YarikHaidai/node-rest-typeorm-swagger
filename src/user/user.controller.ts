import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto, UserDto } from './dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() storeDto: UserCreateDto): Promise<UserDto> {
    return this.userService.createUser(storeDto);
  }
}
