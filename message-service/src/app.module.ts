import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MessageModule } from './messages/messages.module';

@Module({
  imports: [ConfigModule.forRoot(), MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
