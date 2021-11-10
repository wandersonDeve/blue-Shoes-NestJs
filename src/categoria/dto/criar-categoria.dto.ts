import {
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CriarCategoriaDto {
  @IsString()
  @Length(2, 40)
  @MaxLength(188)
  nome: string;
}
