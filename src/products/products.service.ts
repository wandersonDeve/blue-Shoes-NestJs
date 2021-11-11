import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const existing = await this.db.product.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictException('Product already exists');
    }

    const product = await this.db.product.create({
      data: {
        ...data,
      },
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.db.product.findMany();
  }

  async findOne(productId: number): Promise<Product> {
    return this.db.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async update(
    productId: number,
    data: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return this.db.product.update({
      data,
      where: {
        id: productId,
      },
    });
  }

  async deleteOne(id: number): Promise<Product> {
    const userAuth = await this.db.product.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!userAuth) {
      throw new NotFoundException();
    }

    if (userAuth.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.product.delete({
      where: { id },
    });
  }
}
