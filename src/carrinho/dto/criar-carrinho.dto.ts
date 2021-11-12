import { IsNumber, IsOptional } from 'class-validator';

export class CriarCarrinhoDto {
  @IsOptional()
  produtoId: number;

  @IsOptional()
  quantidade: number;

  @IsOptional()
  valor_total: number;

  @IsNumber()
  usuarioId: number;
}
