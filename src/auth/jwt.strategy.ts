import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { jwtConstantes } from './jwt.constants';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstantes.secret,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.db.usuario.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
