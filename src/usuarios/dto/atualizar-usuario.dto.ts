import { Pedido } from '@prisma/client';
import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Cpf } from 'src/common/customCpf';

export class AtualizarUsuarioDto {
  @IsString()
  @Length(2, 40)
  @MaxLength(100)
  @IsOptional()
  nome: string;

  @Length(2, 40)
  @MaxLength(100)
  @IsString()
  @IsOptional()
  sobrenome: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @Cpf()
  @IsString()
  @IsNotEmpty({ message: 'Infome o CPF' })
  @IsOptional()
  cpf: string;

  @Length(8, 20)
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  senha: string;

  //  @IsOptional()
  //  pedido?: Pedido;
}
