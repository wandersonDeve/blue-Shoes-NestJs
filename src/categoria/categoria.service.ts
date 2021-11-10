import { Categorias, Prisma } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private db: PrismaService) {}

  async criarCategoria(
    data: Prisma.CategoriasCreateInput,
  ): Promise<Categorias> {
    const existe = await this.db.categorias.findFirst({
      where: {
        nome: data.nome,
      },
    });
    if (existe) {
      throw new BadRequestException('Categoria já Cadastrada');
    }

    const novaCategoria = await this.db.categorias.create({
      data: data,
    });

    return novaCategoria;
  }

  async listarCategorias(id: number): Promise<Categorias[]> {
    return this.db.categorias.findMany({
      where: {
        id: id,
      },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            imagem: true,
            logo: true,
            marca: true,
          },
        },
      },
    });
  }
}
