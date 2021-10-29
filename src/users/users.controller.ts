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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('/single/:id')
  @UsePipes(ValidationPipe)
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.user.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateUser: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.user.update(id, updateUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: string) {
    return this.user.deleteOne({ id: Number(id) });
  }
}
