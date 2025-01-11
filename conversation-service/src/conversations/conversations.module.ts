import { Module } from '@nestjs/common';
import { ConversationService } from './conversations.service';
import { ConversationController } from './conversations.controller';

@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
