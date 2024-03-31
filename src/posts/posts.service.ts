import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
} from '@nestjs/common';
import {
  CreatePostsDto,
  UpdatePostsDto,
  PaginationParams,
} from './dto/posts.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Posts } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostsDto): Promise<Posts> {
    const newData = await this.prisma.posts.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId: dto.userId,
      },
    });
    return newData;
  }

  async findAll({
    limit,
    decalage,
    dateDebut,
    dateFin,
  }: PaginationParams): Promise<Posts[]> {
    return await this.prisma.posts.findMany({
      skip: decalage,
      take: limit,
      include: {
        comments: true,
        likes: true,

        author: true,
      },
    });
  }

  async findOne(id: string): Promise<Posts | null> {
    return await this.prisma.posts.findUnique({
      where: { id },
      include: {
        comments: true,
        likes: true,

        author: true,
      },
    });
  }

  async update(id: string, dto: UpdatePostsDto): Promise<Posts> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.posts.update({
      where: { id },
      data: {
        title: dto.title ?? data.title,
        content: dto.content ?? data.content,
        userId: dto.userId ?? data.userId,
      },
    });
  }

  async delete(id: string): Promise<Posts> {
    return await await this.prisma.posts.delete({
      where: { id },
    });
  }
}
