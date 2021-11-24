import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto, Prisma } from '@prisma/client';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { AtualizarProdutoDto } from './dto/atualizar-produtos.dto';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { ProcurarProdutosQueryDto } from './dto/procurar-produtos.dto';

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
    return this.db.produto.findMany({
      include: {
        _count: {
          select: {
            Item_do_carrinho: true,
          },
        },
      },
    });
  }

  async findOne(produtoId: number) {
    const { tamanho, ...produto } = await this.db.produto.findUnique({
      where: {
        id: produtoId,
      },
    });

    const produtos = await this.db.produto.findMany({
      where: {
        nome: {
          contains: produto.nome,
          mode: 'insensitive',
        },
      },
    });

    const res = {};
    produtos.map((el) =>
      !res[el.cor]
        ? (res[el.cor] = [el.tamanho])
        : res[el.cor].push(el.tamanho),
    );

    produto['tamanhos'] = res;

    return produto;
  }

  async update(produtoId: number, dto: AtualizarProdutoDto) {
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

  async produtoQuery(queryDto: ProcurarProdutosQueryDto): Promise<any> {
    const { nome, marca } = queryDto;
    const produtos = await this.db.produto.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
        marca: {
          contains: marca,
          mode: 'insensitive',
        },
      },
    });
    return produtos;
  }

  async produtoGetAll(items: any): Promise<any> {
    const produtosGet = items.listaIds;
    const ProdutosRetornados = [];

    for (const i in produtosGet) {
      const produtoEncontrado = await this.db.produto.findUnique({
        where: { id: produtosGet[i] },
      });
      if (!ProdutosRetornados[produtosGet[i]]) {
        ProdutosRetornados[produtosGet[i]] = { ...produtoEncontrado };
        ProdutosRetornados[produtosGet[i]]['quantidade'] = 1;
      } else {
        ProdutosRetornados[produtosGet[i]]['quantidade']++;
      }
    }
    const retorno = Object.values(ProdutosRetornados);

    return retorno;
  }
}
