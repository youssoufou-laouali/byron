import { TestsModule } from './tests/tests.module'
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpExceptionFilter } from './filters/all-exception.filter';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();

@Module({
imports: [TestsModule,
UsersModule,
PostsModule,
CommentsModule,
LikesModule,

ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
ThrottlerModule.forRoot([
{
ttl: 60000,
limit: 10,
},
]),
PrismaModule,
],
controllers: [AppController],
providers: [
{ provide: APP_GUARD, useClass: ThrottlerGuard },
{
provide: APP_FILTER,
useClass: HttpExceptionFilter,
},
AppService,
],
})
export class AppModule {}
