import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pedidos } from '@prisma/client';
import { PedidosDto } from './dto/pedidos-chekout.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  create(@Body() data: PedidosDto): Promise<Pedidos> {
    return this.pedidosService.pedidosCkekout(data);
  }
}
