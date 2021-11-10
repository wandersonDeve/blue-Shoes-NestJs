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
import { Produto } from '@prisma/client';
import { AtualizarUsuarioDto } from 'src/usuarios/dto/atualizar-usuario.dto';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('criar')
  @UseGuards(AuthGuard('jwt'))
  async criarProduto(@Body() produtoDto: CriarProdutoDto): Promise<Produto> {
    return this.produtoService.criarProduto(produtoDto)
  }

  @Post('filtroProduto')
  @UsePipes(ValidationPipe)
  FiltroNome(@Body() produtoDto: CriarProdutoDto): Promise<Produto[]> {
    return this.produtoService.filtroProdutosNome(produtoDto);
  }

  @Post('filtroMarca')
  @UsePipes(ValidationPipe)
  FiltroMarca(@Body() produtoDto: CriarProdutoDto): Promise<Produto[]> {
    return this.produtoService.filtroProdutosMarca(produtoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('atualizar/:id')
  @UsePipes(ValidationPipe)
  atualizarProduto(@Param('id', ParseIntPipe) id: number, @Body() produtoDto:AtualizarUsuarioDto): Promise<Produto> {
    return this.produtoService.atualizarProduto(id, produtoDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  deletarProduto(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.deletarProduto(id)
  }
  
}
