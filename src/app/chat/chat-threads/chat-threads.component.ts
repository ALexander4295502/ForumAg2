import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../../shared/models';
import { ThreadsService } from '../../shared/services';

@Component({
    selector: 'chat-threads',
    templateUrl: 'chat-threads.component.html',
    styleUrls: ['../chat.css'],
    encapsulation: ViewEncapsulation.None
})

export class ChatThreadsComponent {
    threads: Observable<any>;

    constructor(public threadsService: ThreadsService) {
        this.threads = threadsService.orderedThreads;
    }
}