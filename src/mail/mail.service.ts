import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/usuarios/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}&email=${user.email}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bem Vindo ao BlueShoes, confirme seu email',
      template: './confirmation',
      context: {
        name: user.nome,
        url,
      },
    });
    return {
      message: 'Foi enviado para o seu email uma link para confirmação',
    };
  }
}
