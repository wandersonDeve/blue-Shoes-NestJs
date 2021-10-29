import { IsString, Length, MaxLength } from 'class-validator';
import { User } from '.prisma/client';

export class LoginDto {
  @IsString()
  @MaxLength(200)
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
