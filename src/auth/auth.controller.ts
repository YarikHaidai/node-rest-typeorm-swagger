import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto, UserRegisterDto } from './dto';
import { UserDto } from '../user/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Req() request): Promise<LoginResponseDto> {
    return this.authService.login(request.user);
  }

  @Post('register')
  @ApiCreatedResponse({ type: UserDto })
  async register(@Body() dto: UserRegisterDto): Promise<UserDto> {
    return this.authService.register(dto);
  }
}
