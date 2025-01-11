import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConversationModule } from './conversations/conversations.module';

@Module({
  imports: [ConfigModule.forRoot(), ConversationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
