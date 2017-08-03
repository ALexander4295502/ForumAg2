import { User } from './user.model';
import { Thread } from './thread.model';
import { UUID } from 'angular2-uuid';

export class Message {
  id: number;
  body: string;
  createdAt: string;
  author: User;
  isRead: boolean;
  thread: Thread;

    constructor(obj?: any) {
        this.id              = obj && obj.id              || UUID.UUID();
        this.isRead          = obj && obj.isRead          || false;
        this.createdAt       = obj && obj.createdAt       || new Date();
        this.author          = obj && obj.author          || null;
        this.body            = obj && obj.body            || null;
        this.thread          = obj && obj.thread          || null;
    }
}