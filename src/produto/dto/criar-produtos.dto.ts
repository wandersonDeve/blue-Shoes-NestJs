import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  marca: string;

  @IsNumber()
  @IsOptional()
  carrinhoId: number;
}
