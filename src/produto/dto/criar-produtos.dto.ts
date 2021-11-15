import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  logo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsOptional()
  carrinhoId: number;
}
