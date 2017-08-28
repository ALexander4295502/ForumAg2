import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Thread, Message } from '../models';
import { MessagesService } from './messages.service';
import * as _ from 'lodash';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key:string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
          const messagesThread: Thread = threads[message.thread.id];
          if(typeof messagesThread.lastMessage === 'undefined' ||
              Date.parse(messagesThread.lastMessage.createdAt) < Date.parse(message.createdAt)
          ) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });

    this.orderedThreads = this.threads.map((threadGroups: {[key: string]: Thread}) => {
      const threads: Thread[] = _.values(threadGroups);
      return _.sortBy(threads, (t: Thread) => t.lastMessage.createdAt).reverse();
    });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
        (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
              (message.thread.id === currentThread.id))
            .map((message: Message) => {
            message.isRead = true;
            return message;
            })
            .value();
        } else {
          return [];
        }
        });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}

export const threadsServiceInjectables: Array<any> = [
  ThreadsService
];
