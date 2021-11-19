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
  Query,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { Produto } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AtualizarProdutoDto } from './dto/atualizar-produtos.dto';
import { ProcurarProdutosQueryDto } from './dto/procurar-produtos.dto';

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
  async findMany(): Promise<Produto[]> {
    return this.produto.findAll();
  }

  @Get()
  @UsePipes(ValidationPipe)
  async procurarProdutos(
    @Query() query: ProcurarProdutosQueryDto,
  ): Promise<any> {
    return this.produto.produtoQuery(query);
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
    @Body() atualizarProduto: AtualizarProdutoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Produto> {
    return this.produto.update(id, atualizarProduto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.produto.deleteOne(id);
  }
}
