import { IsOptional } from 'class-validator';

export class AuthQueryDto {
  @IsOptional()
  token: string;

  @IsOptional()
  email: string;
}
