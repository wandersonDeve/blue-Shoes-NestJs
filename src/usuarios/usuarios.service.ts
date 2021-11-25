import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from '.prisma/client';
import { UserRole } from './usuario-roles.enum';

@Injectable()
export class UsuariosService {
  constructor(private db: PrismaService) {}

  async criarAdmin(data: CriarUsuarioDto): Promise<Usuario> {
    const hashSenha = await bcrypt.hash(data.senha, 10);

    const novoAdm = await this.db.usuario.create({
      data: {
        ...data,
        role: UserRole.ADMIN,
        senha: hashSenha,
        carrinho: {
          create: {},
        },
      },
    });
    return novoAdm;
  }

  async findAll(): Promise<Usuario[]> {
    return this.db.usuario.findMany();
  }

  //validar essa rota para que o usuario só possa encontrar ele
  async encontraUm(usuarioId: number): Promise<Usuario> {
    const usuarioEncontrado = await this.db.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      include: {
        carrinho: {
          include: {
            item_do_carrinho: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuario Não Encontrado');
    }

    delete usuarioEncontrado.senha;
    return usuarioEncontrado;
  }

  async atualizarUsuario(
    usuariId: number,
    data: CriarUsuarioDto,
  ): Promise<Usuario> {
    const usuarioEncontrado = await this.db.usuario.findUnique({
      where: {
        id: usuariId,
      },
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuario Não Encontrado');
    }

    return this.db.usuario.update({
      data,
      where: {
        id: usuariId,
      },
    });
  }

  async deletarUsuario(id: number) {
    const usuario = await this.db.usuario.findUnique({ where: { id: id } });

    if (!usuario || usuario.id != id) {
      throw new NotFoundException('Erro ao localizar Usuário');
    }

    return this.db.usuario.delete({ where: { id: id } });
  }
}
