import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
} from '@nestjs/common';
import {
  CreateCommentsDto,
  UpdateCommentsDto,
  PaginationParams,
} from './dto/comments.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Comments } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentsDto): Promise<Comments> {
    const newData = await this.prisma.comments.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        postId: dto.postId,
      },
    });
    return newData;
  }

  async findAll({
    limit,
    decalage,
    dateDebut,
    dateFin,
  }: PaginationParams): Promise<Comments[]> {
    return await this.prisma.comments.findMany({
      skip: decalage,
      take: limit,
      include: {
        author: true,
        post: true,
      },
    });
  }

  async findOne(id: string): Promise<Comments | null> {
    return await this.prisma.comments.findUnique({
      where: { id },
      include: {
        author: true,
        post: true,
      },
    });
  }

  async update(id: string, dto: UpdateCommentsDto): Promise<Comments> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.comments.update({
      where: { id },
      data: {
        content: dto.content ?? data.content,
        userId: dto.userId ?? data.userId,
        postId: dto.postId ?? data.postId,
      },
    });
  }

  async delete(id: string): Promise<Comments> {
    return await await this.prisma.comments.delete({
      where: { id },
    });
  }
}
