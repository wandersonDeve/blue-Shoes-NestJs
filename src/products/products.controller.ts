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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('lavoisier')
export class ProductsController {
  constructor(private product: ProductsService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.product.create(createProduct);
  }

  @Get('/all')
  @UsePipes(ValidationPipe)
  async findMany(): Promise<Product[]> {
    return this.product.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/single/:id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.product.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateProduct: CreateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.product.update(id, updateProduct);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: number) {
    return this.product.deleteOne(id);
  }
}
