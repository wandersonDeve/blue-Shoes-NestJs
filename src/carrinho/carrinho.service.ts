import { Injectable, NotFoundException } from '@nestjs/common';
import { Carrinho } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private db: PrismaService) {}

  async findAll(): Promise<Carrinho[]> {
    return this.db.carrinho.findMany();
  }

  async findOne(carrinhoId: number): Promise<Carrinho> {
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
            quantidade: true,
            produto: true,
          },
        },
      },
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    
    return carrinho
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
