import { ApiProperty } from '@nestjs/swagger';
import { Posts, Comments, Likes } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateUsersDto {
  @ApiProperty({
    type: 'string',
    name: 'username',
    description: 'la propriété username de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    name: 'email',
    description: 'la propriété email de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    name: 'password',
    description: 'la propriété password de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  decalage?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  dateDebut?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  dateFin?: string;
}
