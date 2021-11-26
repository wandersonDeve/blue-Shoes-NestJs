import { Pedidos } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

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

  @IsOptional()
  pedidos: Pedidos;
}
