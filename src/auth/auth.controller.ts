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

  @Patch(':token')
  async confirmEmail(@Query() query: AuthQueryDto): Promise<any> {
    await this.service.confirmEmail(query);
    return { message: 'E-mail confirmado' };
  }
}
