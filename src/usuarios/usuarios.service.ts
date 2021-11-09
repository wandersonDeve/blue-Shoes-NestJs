import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from '.prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private db: PrismaService) {}

  async criar(data: CriarUsuarioDto): Promise<Usuario> {
    const buscado = await this.db.usuario.findFirst({
      where: { email: data.email },
    });

    if (buscado != null) {
      throw new BadRequestException('email já Cadastrado');
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
}
