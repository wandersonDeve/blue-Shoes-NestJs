import { IsEmail, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class PedidosDto {
  @IsOptional()
  carrinhoId: number;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsOptional()
  @IsString()
  boleto: string;
}
