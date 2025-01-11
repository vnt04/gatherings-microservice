import { Controller, Get } from '@nestjs/common';
import { MessageService } from './messages.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  index() {
    return this.messageService.index();
  }
}
