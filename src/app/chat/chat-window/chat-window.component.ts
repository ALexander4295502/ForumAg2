import { Component, Inject, ElementRef, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread, User, Message } from '../../shared/models';
import { MessagesService,  ThreadsService, UserService} from '../../shared/services';

@Component({
    selector: 'chat-window',
    templateUrl: 'chat-window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
    messages: Observable<any>;
    currentThread: Thread;
    draftMessage: Message;
    currentUser: User;

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService,
                public usersService: UserService,
                public el: ElementRef) {
    }

    ngOnInit() {
        this.messages = this.threadsService.currentThreadMessages;
        this.draftMessage = new Message();
        this.threadsService.currentThread.subscribe(
            (thread: Thread) => {
                this.currentThread = thread;
            }
        );

        this.usersService.currentUser.subscribe(
            (user: User) => {
                this.currentUser = user;
            });

        this.messages.subscribe((messages: Array<Message>) => {
            setTimeout(() => {
                this.scrollToBottom();
            });
        });
    }


    onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }

    sendMessage(): void {
        const m: Message = this.draftMessage;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        this.messagesService.addMessage(m);
        this.draftMessage = new Message();
    }

    scrollToBottom(): void {
        const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}