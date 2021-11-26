import {
  Controller,
  Get,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { Carrinho } from '.prisma/client';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private carrinho: CarrinhoService) {}

  @Get('/todos')
  @UsePipes(ValidationPipe)
  async findMany(): Promise<Carrinho[]> {
    return this.carrinho.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.carrinho.findOne(id);
  }

  @Delete('limpar/:id')
  @UsePipes(ValidationPipe)
  async deletarTodos(@Param('id') id: number) {
    return this.carrinho.update(id);
  }
}
