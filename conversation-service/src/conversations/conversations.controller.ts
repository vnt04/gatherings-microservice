import { Controller, Get } from '@nestjs/common';
import { ConversationService } from './conversations.service';

@Controller('conversations')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}
  @Get()
  index() {
    return this.conversationService.index();
  }
}
