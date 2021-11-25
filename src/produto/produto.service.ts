import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AtualizarProdutoDto } from './dto/atualizar-produtos.dto';
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
        marca: {
          select: {
            nome: true,
            logo: true,
            logo_parceiro: true,
          },
        },
        _count: {
          select: {
            item_do_carrinho: true,
          },
        },
      },
    });
  }

  async findOne(produtoId: number) {
    const produto = await this.db.produto.findUnique({
      where: {
        id: produtoId,
      },
      include: {
        marca: {
          select: {
            nome: true,
            logo: true,
            logo_parceiro: true,
          },
        },
      },
    });

    if (!produto) {
      throw new NotFoundException('Produto Não Encontrado');
    }

    delete produto.tamanho;
    delete produto.marcaId;

    const produtos = await this.db.produto.findMany({
      where: {
        nome: {
          contains: produto.nome,
        },
      },
    });

    const res = {};
    produtos.map((el) => (!res[el.cor] ? (res[el.cor] = el.tamanho) : ''));

    produto['tamanhos'] = res;

    return produto;
  }

  async update(produtoId: number, dto: AtualizarProdutoDto) {
    const data: Prisma.ProdutoUpdateInput = {
      ...dto,
    };

    const produto = this.db.produto.update({
      where: { id: produtoId },
      data,
    });

    if (!produto) {
      throw new NotFoundException('Produto Não Encontrado');
    }

    return produto;
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
    const { nome, marca, tamanho, cor } = queryDto;
    const produtos = await this.db.produto.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
        marca: {
          is: {
            nome: {
              contains: marca,
              mode: 'insensitive',
            },
          },
        },
        tamanho: {
          equals: Number(tamanho),
        },
        cor: {
          contains: cor,
          mode: 'insensitive',
        },
      },
      include: {
        marca: true,
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
