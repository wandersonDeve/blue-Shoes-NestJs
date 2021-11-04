import { IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  logo: string;

  @IsNumber()
  price: number;

  // @IsArray()
  // @IsString({ each: true })
  // storage: string[];

  @IsString()
  description: string;

  // @IsArray()
  // @IsString({ each: true })
  // categories: string[];

  // @IsArray()
  // @IsString({ each: true })
  // tags: string[];
}
