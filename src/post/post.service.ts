import { BadRequestException, Injectable } from '@nestjs/common';
import { PostDto, PostCreateDto, PostUpdateDto } from './dto';
import { PostRepository } from './post.repository';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  public async findUsersPosts(id: string): Promise<PostDto[]> {
    return this.postRepository.findUsersPosts(id);
  }

  public async createPost(
    user: User,
    postData: PostCreateDto,
  ): Promise<PostDto> {
    return await this.postRepository.createPost(user, postData);
  }

  public async updatePost(
    id: string,
    postData: PostUpdateDto,
  ): Promise<PostDto> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not exist!');
    }
    const toUpdate = Object.assign(post, postData);
    return await this.postRepository.updatePost(id, toUpdate);
  }

  public async deletePost(id: string): Promise<PostDto | null> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not exist!');
    }
    return await this.postRepository.deleteById(id);
  }
}
