import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto';

export class UserMapper {
  public static toDto(entity: User): UserDto {
    return { ...entity };
  }

  public static toCreateEntity(inputData: any): User {
    return Object.assign(new User(), {
      id: uuidv4(),
      ...inputData,
    });
  }

  public static toUpdateEntity(inputData: any): User {
    return Object.assign(new User(), {
      ...inputData,
    });
  }
}
