import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dto';
import { UserMapper } from './user.mapper';
import { UserRegisterDto } from '../auth/dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async registerUser(userData: UserRegisterDto): Promise<UserDto | null> {
    const entity = UserMapper.toCreateEntity(userData);
    const user = await this.manager.save(User, entity);
    return this.findById(user.id);
  }

  public async updateUser(
    id: string,
    userData: UserUpdateDto,
  ): Promise<UserDto | null> {
    const entity = UserMapper.toUpdateEntity(userData);
    await this.manager.save(entity);
    return this.findById(id);
  }

  public async findById(id: string): Promise<UserDto | null> {
    const user = await this.manager.findOne(User, {
      where: { id },
    });
    return user ? UserMapper.toDto(user) : null;
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.manager.findOne(User, {
      where: { email },
      relations: ['posts'],
    });

    return user ? UserMapper.toDto(user) : null;
  }

  public async deleteById(id: string): Promise<UserDto | null> {
    const user = this.findById(id);
    await this.manager.delete(User, {
      where: { id },
    });
    return user ? user : null;
  }
}
