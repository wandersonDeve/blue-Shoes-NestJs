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
  Query,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { Produto } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AtualizarProdutoDto } from './dto/atualizar-produtos.dto';
import { ProcurarProdutosQueryDto } from './dto/procurar-produtos.dto';
import { UserRole } from 'src/usuarios/usuario-roles.enum';
import { Role } from 'src/common/role.decorator';

@Controller('produto')
export class ProdutoController {
  constructor(private produto: ProdutoService) {}

  @Post('/criar')
  @UseGuards(AuthGuard('jwt'))
  @Role(UserRole.ADMIN)
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

  @Post('getList')
  @UsePipes(ValidationPipe)
  async getList(@Body() listaIds: any): Promise<any> {
    return this.produto.produtoGetAll(listaIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Role(UserRole.ADMIN)
  @Put('/atualizar/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() atualizarProduto: AtualizarProdutoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Produto> {
    return this.produto.update(id, atualizarProduto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Role(UserRole.ADMIN)
  @Delete('deletar/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.produto.deleteOne(id);
  }
}
