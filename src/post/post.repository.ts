import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  public async createPost(postData: PostCreateDto): Promise<PostDto | null> {
    const entity = PostMapper.toCreateEntity(postData);
    const post = await this.manager.save(Post, entity);
    return this.findById(post.id);
  }

  public async updatePost(
    id: string,
    postData: PostUpdateDto,
  ): Promise<PostDto | null> {
    const entity = PostMapper.toUpdateEntity(postData);
    await this.manager.save(entity);
    return this.findById(id);
  }

  public async findById(id: string): Promise<PostDto | null> {
    const post = await this.manager.findOne(Post, {
      where: { id },
    });
    return post ? PostMapper.toDto(post) : null;
  }

  public async deleteById(id: string): Promise<PostDto | null> {
    const post = this.findById(id);
    await this.manager.delete(Post, {
      where: { id },
    });
    return post ? post : null;
  }
}
