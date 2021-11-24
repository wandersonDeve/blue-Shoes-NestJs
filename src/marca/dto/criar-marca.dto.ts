import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarMarcaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  logo: string;

  @IsOptional()
  logo_parceiro: string;
}
