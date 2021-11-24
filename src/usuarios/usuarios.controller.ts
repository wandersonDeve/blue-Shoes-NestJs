import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from '@prisma/client';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  criarUsuario(@Body() usuarioDto: CriarUsuarioDto): Promise<Usuario> {
    return this.usuariosService.criarUsuario(usuarioDto);
  }

  @Post('adm')
  @UsePipes(ValidationPipe)
  criarAdmin(@Body() usuarioDto: CriarUsuarioDto): Promise<Usuario> {
    return this.usuariosService.criarAdmin(usuarioDto);
  }

  @Get('/todos')
  @UsePipes(ValidationPipe)
  async findMany(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @UsePipes(ValidationPipe)
  encontraUm(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.encontraUm(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/atualizar/:id')
  @UsePipes(ValidationPipe)
  atualizarUsuario(
    @Body() usuarioDto: CriarUsuarioDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario> {
    return this.usuariosService.atualizarUsuario(id, usuarioDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  deletaum(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.deletarUsuario(id);
  }
}
