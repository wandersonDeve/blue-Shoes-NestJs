import { IsOptional } from 'class-validator';

export class ProcurarProdutosQueryDto {
  @IsOptional()
  nome: string;

  @IsOptional()
  marca: string;

  @IsOptional()
  tamanho: string;

  @IsOptional()
  cor: string;
}
