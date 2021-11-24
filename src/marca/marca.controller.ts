import { Marca } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/role.decorator';
import { UserRole } from 'src/usuarios/usuario-roles.enum';
import { CriarMarcaDto } from './dto/criar-marca.dto';
import { MarcaService } from './marca.service';

@Controller('marca')
export class MarcaController {
  constructor(private marca: MarcaService) {}

  @Post('/criar')
  @UseGuards(AuthGuard('jwt'))
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  async create(@Body() criarMarca: CriarMarcaDto): Promise<Marca> {
    return this.marca.create(criarMarca);
  }

  @Get('/todas')
  @UsePipes(ValidationPipe)
  async findMany(): Promise<Marca[]> {
    return this.marca.findAll();
  }
}
