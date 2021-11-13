import { IsNumber, IsOptional } from 'class-validator';

export class CriarCarrinhoDto {
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
}
