import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsPostalCode,
  IsArray,
  Matches,
} from 'class-validator';

import { Cpf } from '../../common/customtCpf';

export class CreateUserDto {
  @IsOptional()
  createdAt: Date;

  @IsString()
  @Length(2, 40)
  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 carcateres',
  })
  name: string;

  @Cpf()
  @IsString()
  @IsNotEmpty({ message: 'Infome o CPF' })
  cpf: string;

  @IsPostalCode('BR')
  @IsNotEmpty({ message: 'Informar o CEP' })
  cep: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email de ter menos de 200 carcateres',
  })
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  // @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  // @MinLength(8, {
  //   message: 'A confirmação de senha deve ter no mínimo 8 carcateres',
  // })
  // passwordConfirmation: string;
}
