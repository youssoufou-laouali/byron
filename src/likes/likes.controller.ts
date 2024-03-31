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
import { LikesService } from './likes.service';
import {
  CreateLikesDto,
  UpdateLikesDto,
  PaginationParams,
} from './dto/likes.dto';
import { Likes } from '@prisma/client';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @ApiCreatedResponse({ description: 'Créer un nouveau Likes' })
  @ApiResponse({
    status: 201,
    description: 'Likes est crée',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: CreateLikesDto })
  @ApiOperation({
    operationId: 'CreateLikes',
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
  create(@Body() dto: CreateLikesDto): Promise<Likes> {
    return this.likesService.create(dto);
  }

  @ApiCreatedResponse({ description: 'Tous les Likes' })
  @ApiResponse({
    status: 200,
    description: 'Les Likes sont retrouvés',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetAllLikes',
  })
  @Get('')
  findAll(
    //@Query('search') search: string,
    @Query() { decalage = 0, limit = 20, dateDebut, dateFin }: PaginationParams,
  ): Promise<Likes[]> {
    return this.likesService.findAll({ decalage, limit, dateDebut, dateFin });
  }

  @ApiCreatedResponse({ description: 'Chercher un Likes' })
  @ApiResponse({
    status: 200,
    description: 'Le Likes est trouvé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetOneLikes',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Likes | null> {
    return this.likesService.findOne(id);
  }

  @ApiCreatedResponse({ description: 'Modification de Likes' })
  @ApiResponse({
    status: 200,
    description: 'Likes est modifié',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: UpdateLikesDto })
  @ApiOperation({
    operationId: 'UpdateLikes',
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
  update(@Param('id') id: string, @Body() dto: UpdateLikesDto): Promise<Likes> {
    return this.likesService.update(id, dto);
  }

  @ApiCreatedResponse({ description: 'Supprimer Likes' })
  @ApiResponse({
    status: 200,
    description: 'Le Likes est suprimé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'SoftDeleteLikes',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Likes> {
    return this.likesService.delete(id);
  }
}
