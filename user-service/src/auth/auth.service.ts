import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/user/helper/bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(userLogin: LoginDTO) {
    const { email, password } = userLogin;
    // check if email isn't exist
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('Email không tồn tại.');
    }

    // check if password is matching
    const isPasswordMatch = comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Sai mật khẩu.');
    }
    // generate access token and refresh token
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: 'Login successfully.',
      access_token,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
