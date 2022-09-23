import { Post } from './post.entity';
import { v4 as uuidv4 } from 'uuid';
import { PostDto } from './dto';

export class PostMapper {
  public static toDto(entity: Post): PostDto {
    return { ...entity };
  }

  public static toCreateEntity(inputData: any): Post {
    return Object.assign(new Post(), {
      id: uuidv4(),
      ...inputData,
    });
  }

  public static toUpdateEntity(inputData: any): Post {
    return Object.assign(new Post(), {
      ...inputData,
    });
  }
}
