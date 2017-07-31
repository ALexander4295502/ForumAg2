import { User } from './user.model';
import { Thread } from './thread.model';

export class Message {
  id: number;
  body: string;
  createdAt: string;
  author: User;
  isRead: boolean;
  thread: Thread;
}