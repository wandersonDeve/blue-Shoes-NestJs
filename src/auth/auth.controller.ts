import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from './dto/auth.dto';
import { CriarUsuarioDto } from 'src/usuarios/dto/criar-usuario.dto';
import { AuthQueryDto } from './dto/auth.query.dto';
import { ChangePasswordDto } from './dto/recoverypassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/cadastrar')
  async signUp(
    @Body(ValidationPipe) usuario: CriarUsuarioDto,
  ): Promise<{ message: string }> {
    await this.service.signUp(usuario);
    return {
      message:
        'Cadastro realizado com sucesso, um link de confirmação foi enviado para seu email. Confirme seu e-mail, antes de fazer login',
    };
  }

  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @Post('/recuperar-senha')
  async enviarNovaSenhaEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.service.enviarNovaSenhaEmail(email);
    return {
      message: 'Foi enviado um e-mail com instruções para alteração de senha',
    };
  }

  @Patch(':token')
  async confirmEmail(@Query() query: AuthQueryDto): Promise<any> {
    await this.service.confirmEmail(query);
    return { message: 'E-mail confirmado' };
  }

  @Patch('/nova-senha/:token')
  async novaSenha(
    @Query() query: AuthQueryDto,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.service.novaSenha(query, changePasswordDto);
    return { message: 'Senha alterada com sucesso!' };
  }
}
