import { Marca, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MarcaService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.MarcaCreateInput): Promise<Marca> {
    const marca = await this.db.marca.create({
      data: {
        ...data,
      },
    });

    return marca;
  }

  async findAll(): Promise<Marca[]> {
    return this.db.marca.findMany({});
  }
}
