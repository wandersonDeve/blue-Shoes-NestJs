import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [PrismaModule],
})
export class ProductsModule {}
