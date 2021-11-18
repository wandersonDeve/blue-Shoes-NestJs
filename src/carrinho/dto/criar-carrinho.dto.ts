import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CriarCarrinhoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  produtoId: number;

  @IsNumber()
  @IsOptional()
  quantidade: number;

  @IsOptional()
  valor_total: number;

  @IsNumber()
  @IsOptional()
  usuarioId: number;

  @IsNumber()
  tamanho: number;

  @IsString()
  cor: string;
}
