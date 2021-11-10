import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  // async findAll(): Promise<User[]> {
  //   return this.prisma.user.findMany();
  // }

  async findOne(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async update(userId: number, data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.update({
      data,
      where: {
        id: userId,
      },
    });
  }

  async deleteOne(id: number): Promise<User> {
    const userAuth = await this.prisma.user.findUnique({
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

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
