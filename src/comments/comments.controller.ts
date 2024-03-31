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
import { CommentsService } from './comments.service';
import {
  CreateCommentsDto,
  UpdateCommentsDto,
  PaginationParams,
} from './dto/comments.dto';
import { Comments } from '@prisma/client';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiCreatedResponse({ description: 'Créer un nouveau Comments' })
  @ApiResponse({
    status: 201,
    description: 'Comments est crée',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: CreateCommentsDto })
  @ApiOperation({
    operationId: 'CreateComments',
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
  create(@Body() dto: CreateCommentsDto): Promise<Comments> {
    return this.commentsService.create(dto);
  }

  @ApiCreatedResponse({ description: 'Tous les Comments' })
  @ApiResponse({
    status: 200,
    description: 'Les Comments sont retrouvés',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetAllComments',
  })
  @Get('')
  findAll(
    //@Query('search') search: string,
    @Query() { decalage = 0, limit = 20, dateDebut, dateFin }: PaginationParams,
  ): Promise<Comments[]> {
    return this.commentsService.findAll({
      decalage,
      limit,
      dateDebut,
      dateFin,
    });
  }

  @ApiCreatedResponse({ description: 'Chercher un Comments' })
  @ApiResponse({
    status: 200,
    description: 'Le Comments est trouvé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetOneComments',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comments | null> {
    return this.commentsService.findOne(id);
  }

  @ApiCreatedResponse({ description: 'Modification de Comments' })
  @ApiResponse({
    status: 200,
    description: 'Comments est modifié',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: UpdateCommentsDto })
  @ApiOperation({
    operationId: 'UpdateComments',
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
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentsDto,
  ): Promise<Comments> {
    return this.commentsService.update(id, dto);
  }

  @ApiCreatedResponse({ description: 'Supprimer Comments' })
  @ApiResponse({
    status: 200,
    description: 'Le Comments est suprimé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'SoftDeleteComments',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Comments> {
    return this.commentsService.delete(id);
  }
}
