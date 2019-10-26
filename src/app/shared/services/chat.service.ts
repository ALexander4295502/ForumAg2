/**
 * Created by zhengyuan on 2017/8/22.
 */
/**
 * 选择这段代码的原因是想说明自己对于一些接触不多的技术具有较快的上手能力。
 * 因为自己之前一直想给自己的论坛增加一个实时通讯的功能，然后通过比较一些常见的实现方法最终决定使用Socket.IO+rxjs的方式来实现。
 * 但因为自己之前接触rxjs这个库并不多，所以在实现功能和最后的整合过程中还遇到了许多的问题，
 * 但通过不断的debug以及查询相关document最终还是完成了这一功能的实现。
 */
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProfilesService } from './profiles.service';
import { MessagesService } from './messages.service';
import { ThreadsService } from './threads.service';
import { environment } from '../../../environments/environment';
import { User, Thread, Message } from '../models';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {
    public socket: any;
    private connectedUsers: any;

    constructor (
        private userService: UserService,
        private messagesService: MessagesService,
        private threadsService: ThreadsService,
        private profileService: ProfilesService,
    ) {}

    connectSocket() {

        let reference = this;

        this.socket = io.connect(environment.socket_url, {
            query: 'token=' + this.userService.getCurrentUser().token
        });

        this.socket.on('updateUserList', function (_connectedUsers) {
            console.log("updatelist", _connectedUsers);
            reference.connectedUsers = _connectedUsers;
            reference.connectedUsers.forEach(_username => {
                reference.createInitialMessage(_username);
            });
        });

        this.socket.on("addUserToUserList", function(_username){
            console.log("currentList: ", reference.connectedUsers);
            if (reference.connectedUsers.indexOf(_username) !== -1) {
                return;
            }

            console.log(`add user to user list: \n`, _username);
            reference.threadsService.orderedThreads.subscribe(_threads => {
                _threads.forEach(_thread => {
                    if(_thread.name === _username) {
                        return;
                    }
                });
            });
            reference.createInitialMessage(_username);
            reference.connectedUsers.push(_username);
        });

        this.socket.on('receiveMessage', function (_message) {
            reference.findThread(_message.author.username).subscribe(_thread => {
                reference.messagesService.addMessage(new Message({
                    author: _message.author,
                    body: _message.body,
                    thread: _thread
                }));
            });
        });
    }

    createInitialMessage(_username) {
        this.profileService.get(_username).subscribe(_user => {
            const _thread: Thread = new Thread(undefined, _user.username, _user.image);
            const _message: Message = new Message({
                author: _user,
                body: `Hello, nice to meet you. I am ${_username}.`,
                thread: _thread
            })
            this.messagesService.addMessage(_message);
            this.threadsService.setCurrentThread(_thread);
        });
    }

    emitMessage(_message) {
        this.socket.emit('sendMessage', _message);
    }

    findThread(_username): Observable<Thread> {
        return this.threadsService.orderedThreads
            .map(threads => threads.find(thread => thread.name === _username)).first();
    }


s
}
