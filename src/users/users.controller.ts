import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '.prisma/client';

@Controller('user')
export class UsersController {
  constructor(private user: UsersService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return this.user.create(createUser);
  }

  //   @Get('/all')
  //   @UsePipes(ValidationPipe)
  //   async findMany(): Promise<User[]> {
  //     return this.user.findAll();
  //   }

  @Get('/single/:id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.user.findOne(id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateUser: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.user.update(id, updateUser);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: string) {
    return this.user.deleteOne({ id: Number(id) });
  }
}
