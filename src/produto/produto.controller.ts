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
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { Produto } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
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
}
