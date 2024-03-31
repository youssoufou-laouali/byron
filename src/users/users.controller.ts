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
import { UsersService } from './users.service';
import {
  CreateUsersDto,
  UpdateUsersDto,
  PaginationParams,
} from './dto/users.dto';
import { Users } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse({ description: 'Créer un nouveau Users' })
  @ApiResponse({
    status: 201,
    description: 'Users est crée',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: CreateUsersDto })
  @ApiOperation({
    operationId: 'CreateUsers',
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
  create(@Body() dto: CreateUsersDto): Promise<Users> {
    return this.usersService.create(dto);
  }

  @ApiCreatedResponse({ description: 'Tous les Users' })
  @ApiResponse({
    status: 200,
    description: 'Les Users sont retrouvés',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetAllUsers',
  })
  @Get('')
  findAll(
    //@Query('search') search: string,
    @Query() { decalage = 0, limit = 20, dateDebut, dateFin }: PaginationParams,
  ): Promise<Users[]> {
    return this.usersService.findAll({ decalage, limit, dateDebut, dateFin });
  }

  @ApiCreatedResponse({ description: 'Chercher un Users' })
  @ApiResponse({
    status: 200,
    description: 'Le Users est trouvé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'GetOneUsers',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users | null> {
    return this.usersService.findOne(id);
  }

  @ApiCreatedResponse({ description: 'Modification de Users' })
  @ApiResponse({
    status: 200,
    description: 'Users est modifié',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiBody({ type: UpdateUsersDto })
  @ApiOperation({
    operationId: 'UpdateUsers',
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
  update(@Param('id') id: string, @Body() dto: UpdateUsersDto): Promise<Users> {
    return this.usersService.update(id, dto);
  }

  @ApiCreatedResponse({ description: 'Supprimer Users' })
  @ApiResponse({
    status: 200,
    description: 'Le Users est suprimé',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found, le id est introuvable' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiOperation({
    operationId: 'SoftDeleteUsers',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Users> {
    return this.usersService.delete(id);
  }
}
