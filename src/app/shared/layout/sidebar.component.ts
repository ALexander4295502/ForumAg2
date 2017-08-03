import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatExampleData } from './chat-setup-data';

import { ThreadsService, MessagesService } from '../services';

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css',],
    encapsulation: ViewEncapsulation.Native
})
export class SidebarComponent {

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService) {
        ChatExampleData.init(messagesService, threadsService);
    }

}
