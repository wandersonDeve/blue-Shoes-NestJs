import { Prisma } from '@prisma/client';

export class ItemDoCarrinho
  implements Prisma.Item_do_carrinhoUncheckedCreateInput
{
  id?: number;
  carrinhoId?: number;
  produtoId?: number;
  quantidade: number;
}
