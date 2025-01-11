import {
  BadRequestException,
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

  async login(userLogin: LoginDTO): Promise<any> {
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

    return this.generateToken(payload);
  }

  async refreshToken(refresh_token: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token);
      const existRefreshToken = await prisma.user.findFirst({
        where: { id: verify.sub, refresh_token },
      });

      if (existRefreshToken) {
        return this.generateToken({ sub: verify.sub, email: verify.email });
      } else {
        throw new BadRequestException('Refresh token is not valid');
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Refresh token is not valid');
    }
  }

  private async generateToken(payload: { sub: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_LIVE,
    });
    await prisma.user.update({
      where: { id: payload?.sub },
      data: { refresh_token: refresh_token },
    });

    return { access_token, refresh_token };
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
