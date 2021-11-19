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
import { UserRole } from '../usuario-roles.enum';

export class CriarUsuarioDto {
  @IsString()
  @Length(2, 100)
  @MaxLength(100)
  @IsOptional()
  nome: string;

  @IsOptional()
  @Length(2, 100)
  @MaxLength(100)
  @IsString()
  sobrenome: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @Cpf()
  @IsString()
  @IsNotEmpty({ message: 'Infome o CPF' })
  cpf: string;

  @Length(8, 20)
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  senha: string;

  @IsOptional()
  pedido: Pedido;

  @IsOptional()
  role: UserRole;

  @IsOptional()
  carrinhoId: number;
}
