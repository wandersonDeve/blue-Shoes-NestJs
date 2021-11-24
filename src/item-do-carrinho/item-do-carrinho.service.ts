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

    const item = await this.db.item_do_carrinho.findFirst({
      where: {
        carrinhoId: carrinhoId,
        AND: {
          produtoId: produtoId,
        },
      },
    });

    if (!item) {
      await this.db.item_do_carrinho.create({
        data: {
          ...data,
          produtoId: produtoId,
          carrinhoId: carrinhoId,
        },
      });
    } else {
      await this.db.item_do_carrinho.update({
        where: {
          id: item.id,
        },
        data: {
          quantidade: {
            increment: data.quantidade,
          },
        },
      });
    }

    return this.db.carrinho.findUnique({
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
  }

  async findOne(itemId: number): Promise<Item_do_carrinho> {
    const item = this.db.item_do_carrinho.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return item;
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
