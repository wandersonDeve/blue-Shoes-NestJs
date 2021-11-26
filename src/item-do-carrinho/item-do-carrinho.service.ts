import { CreateItemDoCarrinhoDto } from './dto/create-item-do-carrinho.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateItemDoCarrinhoDto } from './dto/update-item-do-carrinho.dto';
import { Item_do_carrinho } from '@prisma/client';

@Injectable()
export class ItemDoCarrinhoService {
  constructor(private db: PrismaService) {}

  async create(data: CreateItemDoCarrinhoDto): Promise<any> {
    const produtoId = data.produtoId;
    const carrinhoId = data.carrinhoId;

    await this.db.item_do_carrinho.create({
      data: {
        ...data,
        produtoId: produtoId,
        carrinhoId: carrinhoId,
      },
    });
    const carrinho = this.db.carrinho.findUnique({
      where: {
        id: carrinhoId,
      },
      include: {
        _count: {
          select: { Item_do_carrinho: true },
        },
        Item_do_carrinho: {
          select: {
            id: true,
            produto: true,
            quantidade: true,
          },
        },
      },
    });

    if (!carrinho) {
      throw new NotFoundException();
    }

    return carrinho;
  }

  async findOne(itemId: number): Promise<Item_do_carrinho> {
    const item = this.db.item_do_carrinho.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async update(itemId: number, dto: UpdateItemDoCarrinhoDto) {
    const data: UpdateItemDoCarrinhoDto = {
      ...dto,
    };
    const carrinho = this.db.item_do_carrinho.update({
      where: { id: itemId },
      data,
    });

    if (!carrinho) {
      throw new NotFoundException();
    }

    return carrinho;
  }

  async remove(
    id: number,
    data: UpdateItemDoCarrinhoDto,
  ): Promise<Item_do_carrinho> {
    const item = await this.db.item_do_carrinho.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!item) {
      throw new NotFoundException();
    }

    return this.db.item_do_carrinho.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        carrinhoId: null,
      },
    });
  }
}
