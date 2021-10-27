import { Injectable } from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
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

  async deleteOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
