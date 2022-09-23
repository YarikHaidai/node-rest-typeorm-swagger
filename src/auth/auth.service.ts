import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto';
import { LoginResponseDto, UserRegisterDto } from './dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDto): Promise<LoginResponseDto> {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.refreshToken.signOptions.expiresIn,
      }),
    };
  }

  async register(user: UserRegisterDto): Promise<UserDto> {
    return this.userService.createUser(user);
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }

    return null;
  }
}
