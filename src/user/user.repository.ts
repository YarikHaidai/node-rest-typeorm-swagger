import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserDto } from './dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(userData: UserCreateDto): Promise<UserDto | null> {
    const entity = UserMapper.toCreateEntity(userData);
    const user = await this.manager.save(User, entity);
    return this.findById(user.id);
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
