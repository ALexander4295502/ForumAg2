import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, ThreadsService, MessagesService } from '../../shared/services';
import { Message, Thread, User } from '../../shared/models';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html'
})

export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  this.userService.currentUser
    .subscribe(
    (user: User) => {
      this.currentUser = user;
      if(this.message.author && user) {
      this.incoming = this.message.author.username !== user.username;
      }
    }
    );
  }
}

