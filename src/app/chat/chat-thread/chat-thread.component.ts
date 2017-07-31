import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from '../../shared/services';
import { Thread } from '../../shared/models';

@Component({
    selector: 'chat-thread',
    templateUrl: './chat-thread.component.html'
})
export class ChatThreadComponent implements OnInit {
    @Input() thread: Thread;
    selected = false;
    constructor(public threadsService: ThreadsService){}

    ngOnInit(): void {
        this.threadsService.currentThread
            .subscribe((currentThread: Thread) => {
                this.selected = currentThread && this.thread &&
                    (currentThread.id === this.thread.id);
            });
    }

    clicked(event: any): void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}