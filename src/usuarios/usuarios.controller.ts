import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('criar')
  @UsePipes(ValidationPipe)
  criar(@Body() usuarioDto: CriarUsuarioDto): Promise<Usuario>{
    return this.usuariosService.criar(usuarioDto)
  }
}
