import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto, UserUpdateDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete user' })
  @ApiBadRequestResponse({ description: 'User not exist!' })
  @ApiCreatedResponse({ type: UserDto })
  delete(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser(id);
  }
}
