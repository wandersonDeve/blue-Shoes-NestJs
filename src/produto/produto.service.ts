import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Produto } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';

@Injectable()
export class ProdutoService {
  constructor(private db: PrismaService) {}

  async criarProduto(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    const existe = await this.db.produto.findFirst({
      where: {
        nome: data.nome,
      },
    });

    if (existe != null) {
      throw new NotFoundException(
        'Produto já se encontra Cadastrado na base de dados',
      );
    }

    const novoProduto = await this.db.produto.create({
      data: data,
    });

    //por enquanto
    delete novoProduto.carrinhoId;
    delete novoProduto.categoriasId;
    delete novoProduto.quantidade_vendas;

    return novoProduto;
  }

  //posso passar o objeto inteiro ou somente uma string com o campo nome, rever isso quando der
  async filtroProdutosNome(data: CriarProdutoDto): Promise<Produto[]> {
    const produtoFiltrado = await this.db.produto.findMany({
      where: {
        nome: {
          contains: data.nome,
        },
      },
    });

    if (produtoFiltrado.length === 0) {
      throw new NotFoundException('Nenhum Produto Encontrado');
    }

    return produtoFiltrado;
  }

  async filtroProdutosMarca(data: CriarProdutoDto): Promise<Produto[]> {
    const produtoFiltrado = await this.db.produto.findMany({
      where: {
        marca: {
          contains: data.marca,
        },
      },
    });

    if (produtoFiltrado.length === 0) {
      throw new NotFoundException('Nenhum Produto Encontrado');
    }

    return produtoFiltrado;
  }

  async atualizarProduto(
    id: number,
    data: Prisma.ProdutoUpdateInput,
  ): Promise<Produto> {
    const existe = await this.db.produto.findFirst({
      where: {
        id: id,
      },
    });
    console.log(id);
    console.log(existe);
    if (!existe) {
      throw new NotFoundException('Produto Não Encontrado');
    }

    const produtoAtualizado = await this.db.produto.update({
      data,
      where: {
        id: id,
      },
    });

    return produtoAtualizado;
  }

  async deletarProduto(id: number): Promise<Produto> {
    const produtoEncontrado = await this.db.produto.findUnique({
      where: {
        id: id,
      },
    });

    if (!produtoEncontrado) {
      throw new NotFoundException('Produto Não Encontrado');
    }

    const produtoExcluido = await this.db.produto.delete({
      where: {
        id: id,
      },
    });

    return produtoExcluido;
  }
}
