import { MarcaController } from './marca.controller';
import { MarcaService } from './marca.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService, PrismaService],
})
export class MarcaModule {}
