import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from '.prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private db: PrismaService) {}

  async criar(data: CriarUsuarioDto): Promise<Usuario> {
    const buscaEmail = await this.db.usuario.findFirst({
      where: {
        email: data.email,
      },
    });

    const buscaCpf = await this.db.usuario.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

    if (buscaEmail != null || buscaCpf != null) {
      throw new BadRequestException('email ou Cpf já Cadastrado');
    }

    const hashSenha = await bcrypt.hash(data.senha, 10);

    const novoUsuario = await this.db.usuario.create({
      data: {
        ...data,
        senha: hashSenha,
      },
    });

    return novoUsuario;
  }

  //validar essa rota para que o usuario só possa encontrar ele
  async encontraUm(usuarioId: number): Promise<Usuario> {
    const usuarioEncontrado = await this.db.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      include: {
        pedido: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuario Não Encontrado');
    }

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
