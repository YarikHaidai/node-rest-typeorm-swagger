import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dto';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from '../auth/dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findByEmail(email: string): Promise<UserDto | null> {
    return this.userRepository.findByEmail(email);
  }

  public async registerUser(userData: UserRegisterDto): Promise<UserDto> {
    const isExistUser = await this.userRepository.findByEmail(userData.email);
    if (isExistUser) {
      throw new BadRequestException('User exist!');
    }
    return await this.userRepository.registerUser(userData);
  }

  public async updateUser(
    id: string,
    userData: UserUpdateDto,
  ): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not exist!');
    }
    const toUpdate = Object.assign(user, userData);
    return await this.userRepository.updateUser(id, toUpdate);
  }

  public async deleteUser(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not exist!');
    }
    return await this.userRepository.deleteById(id);
  }
}
