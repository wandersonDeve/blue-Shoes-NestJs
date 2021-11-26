import { CriarUsuarioDto } from './../usuarios/dto/criar-usuario.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AuthResponse, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRole } from 'src/usuarios/usuario-roles.enum';
import { AuthQueryDto } from './dto/auth.query.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const { email, senha } = data;

    const usuario = await this.db.usuario.findUnique({
      where: { email },
      include: {
        carrinho: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException();
    }

    const passwordValid = await bcrypt.compare(senha, usuario.senha);

    if (!passwordValid) {
      throw new UnauthorizedException('invalid_credentials');
    }

    if (usuario.confirmationToken != null) {
      await this.mail.send(usuario.confirmationToken, email, usuario.nome);
      throw new UnauthorizedException('Confirme seu email');
    }

    delete usuario.senha;
    delete usuario.recoveryPasswordToken;
    delete usuario.confirmationToken;

    return {
      token: this.jwt.sign({ email }),
      usuario,
    };
  }

  async signUp(data: CriarUsuarioDto) {
    const { confirmationToken, email, nome } = data;
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

    await this.db.usuario.create({
      data: {
        ...data,
        role: UserRole.USER,
        senha: hashSenha,
        confirmationToken: crypto.randomBytes(32).toString('hex'),
        carrinho: {
          create: {},
        },
      },
    });

    await this.mail.send(confirmationToken, email, nome);
  }

  async confirmEmail(queryDto: AuthQueryDto): Promise<any> {
    const { token, email } = queryDto;
    const usuario = await this.db.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (usuario.confirmationToken !== token) {
      throw new NotFoundException('Token invalido');
    }

    await this.db.usuario.update({
      where: {
        email: email,
      },
      data: {
        confirmationToken: null,
      },
    });
  }
}
