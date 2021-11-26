import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstantes } from './jwt.constants';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstantes.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
