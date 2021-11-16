import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateItemDoCarrinhoDto } from './create-item-do-carrinho.dto';

export class UpdateItemDoCarrinhoDto extends PartialType(
  CreateItemDoCarrinhoDto,
) {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  carrinhoId?: number;

  @IsOptional()
  @IsNumber()
  produtoId?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
}
