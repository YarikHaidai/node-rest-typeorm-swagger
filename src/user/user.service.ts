import { Injectable } from '@nestjs/common';
import { UserDto, UserCreateDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: UserCreateDto): Promise<UserDto> {
    return await this.userRepository.createUser(userData);
  }
}
