import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
} from '@nestjs/common';
import {
  CreateUsersDto,
  UpdateUsersDto,
  PaginationParams,
} from './dto/users.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findDuplicates(data): Promise<void> {
    const duplicateValues = await this.prisma.users.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
        ],
        id: {
          not: {
            equals: data?.id,
          },
        },
      },
    });
    if (duplicateValues) {
      throw new ConflictException();
    }
  }
  async create(dto: CreateUsersDto): Promise<Users> {
    await this.findDuplicates({ email: dto.email });
    const newData = await this.prisma.users.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: dto.password,
      },
    });
    return newData;
  }

  async findAll({
    limit,
    decalage,
    dateDebut,
    dateFin,
  }: PaginationParams): Promise<Users[]> {
    return await this.prisma.users.findMany({
      skip: decalage,
      take: limit,
      include: {
        Posts: true,
        Comments: true,
        Likes: true,
      },
    });
  }

  async findOne(id: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({
      where: { id },
      include: {
        Posts: true,
        Comments: true,
        Likes: true,
      },
    });
  }

  async update(id: string, dto: UpdateUsersDto): Promise<Users> {
    await this.findDuplicates({ email: dto.email, id });
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.users.update({
      where: { id },
      data: {
        username: dto.username ?? data.username,
        email: dto.email ?? data.email,
        password: dto.password ?? data.password,
      },
    });
  }

  async delete(id: string): Promise<Users> {
    return await await this.prisma.users.delete({
      where: { id },
    });
  }
}
