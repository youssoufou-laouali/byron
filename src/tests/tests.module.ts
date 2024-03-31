import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule,],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
      