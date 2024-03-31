import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
} from '@nestjs/common';
import {
  CreateLikesDto,
  UpdateLikesDto,
  PaginationParams,
} from './dto/likes.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Likes } from '@prisma/client';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLikesDto): Promise<Likes> {
    const newData = await this.prisma.likes.create({
      data: {
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
  }: PaginationParams): Promise<Likes[]> {
    return await this.prisma.likes.findMany({
      skip: decalage,
      take: limit,
      include: {
        user: true,
        post: true,
      },
    });
  }

  async findOne(id: string): Promise<Likes | null> {
    return await this.prisma.likes.findUnique({
      where: { id },
      include: {
        user: true,
        post: true,
      },
    });
  }

  async update(id: string, dto: UpdateLikesDto): Promise<Likes> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.likes.update({
      where: { id },
      data: {
        userId: dto.userId ?? data.userId,
        postId: dto.postId ?? data.postId,
      },
    });
  }

  async delete(id: string): Promise<Likes> {
    return await await this.prisma.likes.delete({
      where: { id },
    });
  }
}
