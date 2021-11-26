import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { CriarProdutoDto } from './criar-produtos.dto';

export class AtualizarProdutoDto extends PartialType(CriarProdutoDto) {
  @IsOptional()
  @IsNumber()
  carrinhoId: number;

  @IsArray()
  @IsOptional()
  tamanho: number[];
}
