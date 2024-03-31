import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Put,
  Req,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import {
  CreatePostsDto,
  UpdatePostsDto,
  PaginationParams,
} from './dto/posts.dto';
import { Posts } from '@prisma/client';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiCreatedResponse({ description: 'Créer un nouveau Posts' })
  @ApiResponse({
    status: 201,
    description: 'Posts est crée',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: CreatePostsDto })
  @ApiOperation({
    operationId: 'CreatePosts',
    requestBody: {
      content: {
        'multipart/form-data': {
          encoding: {
            about: {
              contentType: 'application/json',
            },
          },
          schema: {
            type: 'object',
            properties: {
              about: { type: 'array', items: { type: 'number' } },
            },
          },
        },
      },
    },
  })
  @Post('')
  create(@Body() dto: CreatePostsDto): Promise<Posts> {
    return this.postsService.create(dto);
  }

  @ApiCreatedResponse({ description: 'Tous les Posts' })
  @ApiResponse({
    status: 200,
    description: 'Les Posts sont retrouvés',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetAllPosts',
  })
  @Get('')
  findAll(
    //@Query('search') search: string,
    @Query() { decalage = 0, limit = 20, dateDebut, dateFin }: PaginationParams,
  ): Promise<Posts[]> {
    return this.postsService.findAll({ decalage, limit, dateDebut, dateFin });
  }

  @ApiCreatedResponse({ description: 'Chercher un Posts' })
  @ApiResponse({
    status: 200,
    description: 'Le Posts est trouvé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetOnePosts',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posts | null> {
    return this.postsService.findOne(id);
  }

  @ApiCreatedResponse({ description: 'Modification de Posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts est modifié',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: UpdatePostsDto })
  @ApiOperation({
    operationId: 'UpdatePosts',
    requestBody: {
      content: {
        'multipart/form-data': {
          encoding: {
            about: {
              contentType: 'application/json',
            },
          },
          schema: {
            type: 'object',
            properties: {
              about: { type: 'array', items: { type: 'number' } },
            },
          },
        },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostsDto): Promise<Posts> {
    return this.postsService.update(id, dto);
  }

  @ApiCreatedResponse({ description: 'Supprimer Posts' })
  @ApiResponse({
    status: 200,
    description: 'Le Posts est suprimé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'SoftDeletePosts',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Posts> {
    return this.postsService.delete(id);
  }
}
