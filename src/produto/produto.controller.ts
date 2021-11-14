import { CriarCarrinhoDto } from 'src/carrinho/dto/criar-carrinho.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { Carrinho, Produto, Usuario } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/common/auth-user.decorator';
import { CriarUsuarioDto } from 'src/usuarios/dto/criar-usuario.dto';
import { AtualizarProdutoDto } from './dto/Atualizar-produtos.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private produto: ProdutoService) {}

  @Post('/criar')
  @UsePipes(ValidationPipe)
  async create(@Body() criarProduto: CriarProdutoDto): Promise<Produto> {
    return this.produto.create(criarProduto);
  }

  @Get('/todos')
  @UsePipes(ValidationPipe)
  async findMany(): Promise<Produto> {
    return this.produto.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.produto.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/atualizar/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() atualizarProduto: CriarProdutoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Produto> {
    return this.produto.update(id, atualizarProduto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: number) {
    return this.produto.deleteOne(id);
  }

  @Patch('adicionar/:id')
  @UseGuards(AuthGuard('jwt'))
  adicionarProduto(
    @Body() carrinho: AtualizarProdutoDto,
    @Param('id') produtoId: number,
  ): Promise<Produto> {
    const carrinhoId = carrinho.carrinhoId;
    return this.produto.adicionarProduto(produtoId, carrinhoId);
  }
}
