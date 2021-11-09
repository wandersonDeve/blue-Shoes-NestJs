import { Pedido } from '@prisma/client';
import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsPostalCode,
  Matches,
} from 'class-validator';
import { Cpf } from 'src/common/customCpf';

export class CriarUsuarioDto {
  @IsString()
  @Length(2, 40)
  @MaxLength(100)
  nome: string;

  @Length(2, 40)
  @MaxLength(100)
  @IsString()
  sobrenome: string;

  @IsEmail()
  @IsString()
  email: string;

  @Cpf()
  @IsString()
  @IsNotEmpty({ message: 'Infome o CPF' })
  cpf: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  senha: string;

  @IsOptional()
  pedido: Pedido;
}
