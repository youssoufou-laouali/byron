import { ApiProperty } from '@nestjs/swagger';

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

export class CreateCommentsDto {
  @ApiProperty({
    type: 'string',
    name: 'content',
    description: 'la propriété content de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: 'string',
    name: 'userId',
    description: 'la propriété userId de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: 'string',
    name: 'postId',
    description: 'la propriété postId de type string',
    default: 'lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  postId: string;
}

export class UpdateCommentsDto extends PartialType(CreateCommentsDto) {}

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
