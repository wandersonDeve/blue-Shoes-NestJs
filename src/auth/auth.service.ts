import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AuthResponse, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

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

    delete usuario.senha;

    return {
      token: this.jwt.sign({ email }),
      usuario,
    };
  }
}
