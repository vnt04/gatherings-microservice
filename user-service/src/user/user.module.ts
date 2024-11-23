import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // issue.
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
