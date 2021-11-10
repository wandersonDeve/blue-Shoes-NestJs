import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Categorias } from '@prisma/client';
import { CategoriaService } from './categoria.service';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}


  @Post('criar')
  @UseGuards(AuthGuard('jwt'))
  criarProduto(@Body() categoriaDto: CriarCategoriaDto): Promise<Categorias> {
    return this.categoriaService.criarCategoria(categoriaDto);
  }

  @Get('listar/:id')
  @UsePipes(ValidationPipe)
  listarCategorias(@Param('id', ParseIntPipe) id:number): Promise<Categorias[]>{
    return this.categoriaService.listarCategorias(id)
  }
}
