import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ItemDoCarrinhoService } from './item-do-carrinho.service';
import { CreateItemDoCarrinhoDto } from './dto/create-item-do-carrinho.dto';
import { UpdateItemDoCarrinhoDto } from './dto/update-item-do-carrinho.dto';
import { Item_do_carrinho } from '@prisma/client';

@Controller('item')
export class ItemDoCarrinhoController {
  constructor(private itemDoCarrinho: ItemDoCarrinhoService) {}

  @Post('/criar')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createItemDoCarrinhoDto: CreateItemDoCarrinhoDto,
  ): Promise<Item_do_carrinho> {
    return this.itemDoCarrinho.create(createItemDoCarrinhoDto);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemDoCarrinho.findOne(id);
  }

  @Put('/atualizar/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDoCarrinhoDto: UpdateItemDoCarrinhoDto,
  ): Promise<Item_do_carrinho> {
    return this.itemDoCarrinho.update(id, updateItemDoCarrinhoDto);
  }

  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    updateItemDoCarrinhoDto: UpdateItemDoCarrinhoDto,
  ) {
    return this.itemDoCarrinho.remove(id, updateItemDoCarrinhoDto);
  }
}
