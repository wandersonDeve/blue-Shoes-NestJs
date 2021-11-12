import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Produto, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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

  async update(
    produtoId: number,
    data: Prisma.ProdutoCreateInput,
  ): Promise<Produto> {
    return this.db.produto.update({
      data,
      where: {
        id: produtoId,
      },
    });
  }

  async deleteOne(id: number): Promise<Produto> {
    const userAuth = await this.db.produto.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!userAuth) {
      throw new NotFoundException();
    }

    if (userAuth.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.produto.delete({
      where: { id },
    });
  }
}
