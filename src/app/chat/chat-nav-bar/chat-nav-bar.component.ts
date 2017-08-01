import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { ThreadsService, MessagesService } from '../../shared/services';
import { Thread, Message } from '../../shared/models';

@Component({
    selector: 'chat-nav-bar',
    templateUrl: './chat-nav-bar.component.html',
    styleUrls: ['../chat.css'],
    encapsulation: ViewEncapsulation.None
})
export class ChatNavBarComponent implements OnInit {
    unreadMessagesCount: number;
    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService) {
    }

    ngOnInit(): void {
        this.messagesService.messages
            .combineLatest(
                this.threadsService.currentThread,
                (messages: Message[], currentThread: Thread) =>
                [currentThread, messages] )
            .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
                this.unreadMessagesCount = _.reduce(
                    messages,
                    (sum: number, m: Message) => {
                        const messageIsInCurrentThread: boolean = m.thread &&
                            currentThread && (currentThread.id === m.thread.id);
                        if(m && !m.isRead && !messageIsInCurrentThread) {
                            sum = sum + 1;
                        }
                        return sum;
                    }, 0);
            });
    }
}