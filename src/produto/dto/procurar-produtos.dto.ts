import { IsOptional } from 'class-validator';

export class ProcurarProdutosQueryDto {
  @IsOptional()
  nome: string;

  @IsOptional()
  marca: string;
}

// async findAll(query: ProcurarProdutosQueryDto): Promise<any> {
//     const res = await this.db.produto.findMany({
//       where: {
//         nome: {
//           contains: query.nome,
//           mode: 'insensitive',
//         },
//       },
//     });

//     return res;
//   }
// @Get('/todos')
//   @UsePipes(ValidationPipe)
//   async findMany(@Query() query: AtualizarProdutoDto): Promise<any> {
//     return this.produto.findAll(query);
//   }
