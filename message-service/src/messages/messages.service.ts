import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  index() {
    return 'this is message service';
  }
}
