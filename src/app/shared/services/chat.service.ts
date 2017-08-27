/**
 * Created by zhengyuan on 2017/8/22.
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
                createdAt: moment().toDate(),
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
            .map(threads => threads.find(thread => thread.name === _username)).take(1);
    }


s
}
