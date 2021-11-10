import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, Usuario } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private db: PrismaService) {}

  async criar(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const userExists = await this.db.usuario.findUnique({
      where: { email: data.email },
    });

    const buscaCpf = await this.db.usuario.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

    if (userExists) {
      throw new ConflictException('Email já está cadastrado');
    }

    if (buscaCpf) {
      throw new BadRequestException('Cpf já Cadastrado');
    }

    
    const salt = 10;
    const hashSenha = await bcrypt.hash(data.senha, salt);

    const novoUsuario = await this.db.usuario.create({
      data: {
        ...data,
        senha: hashSenha,
      },
    });

    delete novoUsuario.senha
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

    delete usuarioEncontrado.senha
    return usuarioEncontrado;
  }

  async atualizarUsuario(usuariId: number, data: Prisma.UsuarioUpdateInput,): Promise<Usuario> {
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
