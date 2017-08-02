/* tslint:disable:max-line-length */
import { User, Thread, Message } from '../../shared/models';
import { MessagesService, ThreadsService, UserService } from '../../shared/services';
import * as moment from 'moment';

// the person using the app us Juliet
let me: User;
const ladycap: User = new User();
ladycap.username = 'ladycap';
const echo: User    = new User();
echo.username = 'echo';
const rev: User     = new User();
rev.username = 'rev';
const wait: User    = new User();
wait.username = 'wait';

const tLadycap: Thread = new Thread('tLadycap', ladycap.username, ladycap.image);
const tEcho: Thread    = new Thread('tEcho', echo.username, echo.image);
const tRev: Thread     = new Thread('tRev', rev.username, rev.image);
const tWait: Thread    = new Thread('tWait', wait.username, wait.image);

const initialMessages: Array<Message> = [
    new Message({
        author: me,
        createdAt: moment().subtract(45, 'minutes').toDate(),
        body: 'Yet let me weep for such a feeling loss.',
        thread: tLadycap
    }),
    new Message({
        author: ladycap,
        createdAt: moment().subtract(20, 'minutes').toDate(),
        body: 'So shall you feel the loss, but not the friend which you weep for.',
        thread: tLadycap
    }),
    new Message({
        author: echo,
        createdAt: moment().subtract(1, 'minutes').toDate(),
        body: `I\'ll echo whatever you send me`,
        thread: tEcho
    }),
    new Message({
        author: rev,
        createdAt: moment().subtract(3, 'minutes').toDate(),
        body: `I\'ll reverse whatever you send me`,
        thread: tRev
    }),
    new Message({
        author: wait,
        createdAt: moment().subtract(4, 'minutes').toDate(),
        body: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
        thread: tWait
    }),
];

export class ChatExampleData {
    static init(messagesService: MessagesService,
                threadsService: ThreadsService,
                userService: UserService): void {

        // TODO make `messages` hot
        messagesService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        me = userService.getCurrentUser();

        // create the initial messages
        initialMessages.map( (message: Message) => messagesService.addMessage(message) );

        threadsService.setCurrentThread(tEcho);

        this.setupBots(messagesService);
    }

    static setupBots(messagesService: MessagesService): void {

        // echo bot
        messagesService.messagesForThreadUser(tEcho, echo)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: echo,
                            body: message.body,
                            thread: tEcho
                        })
                    );
                },
                null);


        // reverse bot
        messagesService.messagesForThreadUser(tRev, rev)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: rev,
                            text: message.body.split('').reverse().join(''),
                            thread: tRev
                        })
                    );
                },
                null);

        // waiting bot
        messagesService.messagesForThreadUser(tWait, wait)
            .forEach( (message: Message): void => {

                    let waitTime: number = parseInt(message.body, 10);
                    let reply: string;

                    if (isNaN(waitTime)) {
                        waitTime = 0;
                        reply = `I didn\'t understand ${message.body}. Try sending me a number`;
                    } else {
                        reply = `I waited ${waitTime} seconds to send you this.`;
                    }

                    setTimeout(
                        () => {
                            messagesService.addMessage(
                                new Message({
                                    author: wait,
                                    text: reply,
                                    thread: tWait
                                })
                            );
                        },
                        waitTime * 1000);
                },
                null);


    }
}
