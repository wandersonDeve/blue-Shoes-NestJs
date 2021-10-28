import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsPostalCode,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty({ message: 'Infome o CPF' })
  @MinLength(11, { message: 'O CPF é composto por 11 numeros' })
  @MaxLength(11, { message: 'O CPF é composto por 11 numeros' })
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
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  password: string;

  // @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  // @MinLength(6, {
  //   message: 'A confirmação de senha deve ter no mínimo 6 carcateres',
  // })
  // passwordConfirmation: string;
}
