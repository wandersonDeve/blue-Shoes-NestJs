import { BadRequestException, Injectable } from '@nestjs/common';
import { Pedidos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PedidosDto } from './dto/pedidos-chekout.dto';

@Injectable()
export class PedidosService {
  constructor(private db: PrismaService) {}

  async pedidosCkekout(data: PedidosDto): Promise<Pedidos> {
    if (!data) {
      throw new BadRequestException();
    }

    console.log(data);

    const pedidos = await this.db.pedidos.create({ data: data });

    if (!pedidos) {
      throw new BadRequestException();
    }

    return pedidos;
  }
}
