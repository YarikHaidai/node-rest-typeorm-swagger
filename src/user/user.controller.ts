import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @ApiOperation({ description: 'Update user' })
  @ApiBadRequestResponse({ description: 'User not exist!' })
  @ApiCreatedResponse({ type: UserDto })
  update(
    @Param('id') id: string,
    @Body() storeDto: UserUpdateDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, storeDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete user' })
  @ApiBadRequestResponse({ description: 'User not exist!' })
  @ApiCreatedResponse({ type: UserDto })
  delete(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser(id);
  }
}
