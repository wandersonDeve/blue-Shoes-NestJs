import { IsString, Length, MaxLength } from 'class-validator';
import { Usuario } from '.prisma/client';

export class LoginDto {
  @IsString()
  @MaxLength(200)
  email: string;

  @IsString()
  @Length(8, 30)
  senha: string;
}

export class AuthResponse {
  token: string;
  usuario: Usuario;
}
