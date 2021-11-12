import { Injectable, NotFoundException } from '@nestjs/common';
import { Carrinho, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.CarrinhoCreateInput): Promise<Carrinho> {
    const carrinho = await this.db.carrinho.create({
      data: {
        ...data,
      },
    });

    return carrinho;
  }

  async findOne(carrinhoId: number): Promise<Carrinho> {
    return this.db.carrinho.findUnique({
      where: {
        id: carrinhoId,
      },
    });
  }

  async update(
    carrinhoId: number,
    data: Prisma.CarrinhoCreateInput,
  ): Promise<Carrinho> {
    return this.db.carrinho.update({
      data,
      where: {
        id: carrinhoId,
      },
    });
  }

  async deleteOne(id: number): Promise<void> {
    const produto = await this.db.carrinho.delete({
      where: { id },
      select: {
        produto: true,
      },
    });
  }
}
