import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async send(token: string, email: string, nome: string): Promise<any> {
    const url = `http://localhost:3000/auth/confirm?token=${token}&email=${email}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'wanderson-santos-1@impulso.network',
        pass: '6aa76ce5',
      },
    });

    await transporter.sendMail({
      from: '"Blueshoes" <no-reply@blueshoes.com>',
      to: email,
      subject: 'Bem Vindo a Blueshoes! Confirme seu Email',
      text: 'Hello world?',
      html: `<html>
      <body>
        <center>
            <div style="background-color: #bdf1e0; max-width: 840px; margin: 0; padding: 40px;">
                <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 48px; font-family: inherit">Bem vindo, ${nome}!</span></div>
                <div style="font-family: inherit; text-align: inherit"><span style="color: #ffffff; font-size: 15px">Muito obrigado por se cadastrar da BlueShoes — estamos emocionados por ter você!&nbsp;</span></div>
                <div style="font-family: inherit; text-align: inherit"><br></div>
                <div style="font-family: inherit; text-align: inherit"><span style="color: #ffffff; font-size: 15px">Clique no link abaixo para validar seu email ou então copie e cole o link no seu navegador.</span></div>
                <td align="center" bgcolor="#ffc94c" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="${url}" style="background-color:#ffc94c; border:1px solid #ffc94c; border-color:#ffc94c; border-radius:40px; border-width:1px; display:inline-block; font-size:15px; font-weight:normal; letter-spacing:0px; line-height:25px; padding:12px 18px 10px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit; width:168px; color:#3f4259;" target="_blank">Validar Email</a>
                </td>
                <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="{{url_page}}" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY BLUESHOES</a></td>
             </div>
        </center>
      </body>
    </html> `,
    });

    return {
      message: 'Foi enviado para o seu email uma link para confirmação',
    };
  }
}
