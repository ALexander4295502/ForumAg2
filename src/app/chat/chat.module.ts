import { NgModule } from '@angular/core';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { FromNowPipe } from '../pipe/from-now.pipe';
import { MessagesService } from '../shared/services/messages.service';
import { ThreadsService } from '../shared/services/threads.service';
import { UserService } from '../shared/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { NgGridModule } from 'angular2-grid';

@NgModule({
    declarations: [
        ChatMessageComponent,
        ChatThreadComponent,
        ChatThreadsComponent,
        ChatNavBarComponent,
        ChatWindowComponent,
        ChatPageComponent,
        FromNowPipe,
    ],
    imports: [
        SharedModule,
        NgGridModule
    ],
    providers: [
        MessagesService, ThreadsService, UserService
    ],
    exports: [
        ChatMessageComponent,
        ChatThreadComponent,
        ChatThreadsComponent,
        ChatNavBarComponent,
        ChatWindowComponent,
        ChatPageComponent,
    ]
})

export class ChatModule {}