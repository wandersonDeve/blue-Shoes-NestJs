import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsOptional()
  categoriasId: number;

  @IsString()
  imagem: string;

  @IsNumber()
  @IsOptional()
  quantidade_vendas: number;

  @IsNumber()
  @IsNotEmpty()
  marcaId: number;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsOptional()
  carrinhoId: number;

  @IsArray()
  tamanho: number[];

  @IsString()
  cor: string;
}
