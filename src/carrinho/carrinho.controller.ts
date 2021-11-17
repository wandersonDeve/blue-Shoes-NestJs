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
} from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CriarCarrinhoDto } from './dto/criar-carrinho.dto';
import { Carrinho } from '.prisma/client';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private carrinho: CarrinhoService) {}

  @Post('/criar')
  @UsePipes(ValidationPipe)
  async create(@Body() criarCarrinho: CriarCarrinhoDto): Promise<Carrinho> {
    return this.carrinho.create(criarCarrinho);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.carrinho.findOne(id);
  }

  @Put('/atualizar/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() atualizarCarrinho: CriarCarrinhoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Carrinho> {
    return this.carrinho.update(id, atualizarCarrinho);
  }

  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: number) {
    return this.carrinho.deleteOne(id);
  }
}
