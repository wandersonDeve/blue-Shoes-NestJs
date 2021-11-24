import { CreateItemDoCarrinhoDto } from './dto/create-item-do-carrinho.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateItemDoCarrinhoDto } from './dto/update-item-do-carrinho.dto';
import { Item_do_carrinho } from '@prisma/client';

@Injectable()
export class ItemDoCarrinhoService {
  constructor(private db: PrismaService) {}

  async create(data: CreateItemDoCarrinhoDto): Promise<Item_do_carrinho> {
    const produtoId = data.produtoId;
    const carrinhoId = data.carrinhoId;

    const item = await this.db.item_do_carrinho.create({
      data: {
        ...data,
        produtoId: produtoId,
        carrinhoId: carrinhoId,
      },
    });

    return item;
  }

  async findOne(itemId: number): Promise<Item_do_carrinho> {
    return this.db.item_do_carrinho.findUnique({
      where: {
        id: itemId,
      },
    });
  }

  async update(itemId: number, dto: UpdateItemDoCarrinhoDto) {
    const data: UpdateItemDoCarrinhoDto = {
      ...dto,
    };

    return this.db.item_do_carrinho.update({
      where: { id: itemId },
      data,
    });
  }

  async remove(id: number): Promise<Item_do_carrinho> {
    const item = await this.db.produto.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!item) {
      throw new NotFoundException();
    }

    return this.db.item_do_carrinho.delete({
      where: { id },
    });
  }
}
