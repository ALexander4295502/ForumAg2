import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatExampleData } from './chat-setup-data';

import { ThreadsService, MessagesService, UserService, ChatService, ApiService } from '../services';

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css',],
    encapsulation: window.navigator.appVersion.includes('Chrome') ? ViewEncapsulation.Native : ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit{

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService,
                public userService: UserService,
                public chatService: ChatService,
                public apiService: ApiService,
    ) {}

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                if (Object.keys(userData).length !== 0) {
                    ChatExampleData.init(this.messagesService, this.threadsService, this.apiService);
                    this.chatService.connectSocket();
                }
            }
        );
    }

}
