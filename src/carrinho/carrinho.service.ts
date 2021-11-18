import { Injectable } from '@nestjs/common';
import { Carrinho, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private db: PrismaService) {}

  async findAll(): Promise<Carrinho[]> {
    return this.db.carrinho.findMany();
  }

  async findOne(carrinhoId: number): Promise<Carrinho> {
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
            quantidade: true,
            produto: true,
          },
        },
      },
    });
  }

  async update(carrinhoId: number): Promise<Carrinho> {
    return this.db.carrinho.update({
      where: {
        id: carrinhoId,
      },
      data: {
        Item_do_carrinho: {
          deleteMany: {},
        },
      },
    });
  }
}
