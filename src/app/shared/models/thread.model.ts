import { Message } from './message.model';

export class Thread{
  id: number;
  lastMessage: Message;
  name: string;
  avatarSrc: string;
}