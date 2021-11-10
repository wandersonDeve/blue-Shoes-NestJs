import { Storage } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  nome: string;

  @IsString()
  @Length(2, 188)
  @MaxLength(188)
  descricao: string;

  @IsOptional()
  categoriasId: number;

  @IsString()
  @Length(2, 188)
  @MaxLength(188)
  imagem: string;

  @IsOptional()
  quantidade_vendas: number;

  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  logo: string;

  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  marca: string;

  @IsNotEmpty()
  @IsNumber()
  preco: number;

  @IsOptional()
  carrinhoId: number;
}
