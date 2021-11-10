import { Storage } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class AtualizarProdutoDto {
  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  @IsOptional()
  nome: string;

  @IsString()
  @Length(2, 188)
  @MaxLength(188)
  @IsOptional()
  descricao: string;

  @IsOptional()
  categoriasId: number;

  @IsString()
  @Length(2, 188)
  @MaxLength(188)
  @IsOptional()
  imagem: string;

  @IsOptional()
  quantidade_vendas: number;

  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  @IsOptional()
  logo: string;

  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  @IsOptional()
  marca: string;

  @IsOptional()
  carrinhoId: number;
}
