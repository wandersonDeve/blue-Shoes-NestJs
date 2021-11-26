import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CarrinhoService, PrismaService],
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
