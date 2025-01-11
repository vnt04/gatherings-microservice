import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {
  index() {
    return 'this is conversation service';
  }
}
