import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { PostService } from './post.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ description: 'Creating a new post' })
  @ApiCreatedResponse({ type: PostDto })
  create(@Body() storeDto: PostCreateDto): Promise<PostDto> {
    return this.postService.createPost(storeDto);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update post' })
  @ApiBadRequestResponse({ description: 'Post not exist!' })
  @ApiCreatedResponse({ type: PostDto })
  update(
    @Param('id') id: string,
    @Body() storeDto: PostUpdateDto,
  ): Promise<PostDto> {
    return this.postService.updatePost(id, storeDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete post' })
  @ApiBadRequestResponse({ description: 'Post not exist!' })
  @ApiCreatedResponse({ type: PostDto })
  delete(@Param('id') id: string): Promise<PostDto> {
    return this.postService.deletePost(id);
  }
}
