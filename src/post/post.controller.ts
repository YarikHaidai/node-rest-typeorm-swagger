import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { PostService } from './post.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RoleGuard from '../user/role.guard';

@ApiTags('Posts')
@UseGuards(JwtAuthGuard)
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Creating a new post' })
  @ApiCreatedResponse({ type: PostDto })
  create(@Req() request, @Body() storeDto: PostCreateDto): Promise<PostDto> {
    return this.postService.createPost(request.user, storeDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RoleGuard())
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
  @ApiBearerAuth()
  @UseGuards(RoleGuard())
  @ApiOperation({ description: 'Delete post' })
  @ApiBadRequestResponse({ description: 'Post not exist!' })
  delete(@Param('id') id: string): Promise<PostDto | null> {
    return this.postService.deletePost(id);
  }
}
