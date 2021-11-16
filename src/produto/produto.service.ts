import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';

@Injectable()
export class ProdutoService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    const produto = await this.db.produto.create({
      data: {
        ...data,
      },
    });

    return produto;
  }

  async findAll(): Promise<Produto[]> {
    return this.db.produto.findMany();
  }

  async findOne(produtoId: number): Promise<Produto> {
    return this.db.produto.findUnique({
      where: {
        id: produtoId,
      },
    });
  }

  async update(produtoId: number, dto: CriarProdutoDto) {
    const data: Prisma.ProdutoUpdateInput = {
      ...dto,
    };

    return this.db.produto.update({
      where: { id: produtoId },
      data,
    });
  }

  async deleteOne(id: number): Promise<Produto> {
    const produto = await this.db.produto.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!produto) {
      throw new NotFoundException();
    }

    return this.db.produto.delete({
      where: { id },
    });
  }
}
