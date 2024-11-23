import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './helper/bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    // check if email exist
    const exist = await prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (exist) {
      throw new ConflictException('Email đã tồn tại!');
    }

    // add new user to database
    const userCreated = await prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashPassword(createUserDto.password),
      },
    });
    if (!userCreated) {
      throw new BadRequestException(
        'Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại',
      );
    }
    return {
      message: 'Created new user successfully.',
      userCreated,
    };
  }
  async getOne(id: number) {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    // update and save data here
    const user = await this.getOne(id);
    if (user) {
      await prisma.user.update({
        where: { id },
        data: updateProfileDto,
      });

      return {
        message: 'Updated profile successfully.',
      };
    }
    throw new NotFoundException(`User with ID ${id} not found.`);
  }
}
