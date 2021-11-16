import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDoCarrinhoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  carrinhoId?: number;

  @IsOptional()
  @IsNumber()
  produtoId?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
}
