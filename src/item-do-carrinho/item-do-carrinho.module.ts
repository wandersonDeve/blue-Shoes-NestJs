import { Module } from '@nestjs/common';
import { ItemDoCarrinhoService } from './item-do-carrinho.service';
import { ItemDoCarrinhoController } from './item-do-carrinho.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItemDoCarrinhoController],
  providers: [ItemDoCarrinhoService, PrismaService],
})
export class ItemDoCarrinhoModule {}
