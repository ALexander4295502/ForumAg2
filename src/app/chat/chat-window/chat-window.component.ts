import { Component, Inject, ElementRef, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread, User, Message } from '../../shared/models';
import { MessagesService,  ThreadsService, UserService, ChatService} from '../../shared/services';

@Component({
    selector: 'chat-window',
    templateUrl: 'chat-window.component.html',
    styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
    messages: Observable<any>;
    currentThread: Thread;
    draftMessage: Message;
    currentUser: User;

    constructor(public chatService: ChatService,
                public messagesService: MessagesService,
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
        m.author = {
            username: this.currentUser.username,
            image: this.currentUser.image,
            email: this.currentUser.email,
            bio: this.currentUser.bio,
            token: null
        };
        m.thread = this.currentThread;
        m.createdAt = new Date().toString();
        m.isRead = true;
        this.messagesService.addMessage(m);
        this.chatService.emitMessage({
            author: m.author,
            createdAt: m.createdAt,
            body: m.body,
            to: this.currentThread.name
        });
        this.draftMessage = new Message();
    }

    scrollToBottom(): void {
        const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}
