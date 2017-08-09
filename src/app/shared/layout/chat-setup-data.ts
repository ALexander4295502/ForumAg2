import { User, Thread, Message } from '../models';
import { MessagesService, ThreadsService, UserService } from '../services';
import * as moment from 'moment';

// the person using the app us Juliet
const ladycap: User = new User();
ladycap.username = 'ladycap';
ladycap.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
const echo: User    = new User();
echo.username = 'echo';
echo.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
const rev: User     = new User();
rev.username = 'rev';
rev.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
const wait: User    = new User();
wait.username = 'wait';
wait.image = "https://static.productionready.io/images/smiley-cyrus.jpg";

const tLadycap: Thread = new Thread('tLadycap', ladycap.username, ladycap.image);
const tEcho: Thread    = new Thread('tEcho', echo.username, echo.image);
const tRev: Thread     = new Thread('tRev', rev.username, rev.image);
const tWait: Thread    = new Thread('tWait', wait.username, wait.image);

const initialMessages: Array<Message> = [
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
                ): void {

        // TODO make `messages` hot
        messagesService.messages.subscribe(() => ({}));

        // create the initial messages
        initialMessages.map( (message: Message) => messagesService.addMessage(message) );

        threadsService.setCurrentThread(tEcho);

        this.setupBots(messagesService);
    }

    static setupBots(messagesService: MessagesService): void {

        // ladycap bot
        messagesService.messagesForThreadUser(tLadycap, ladycap)
            .forEach((message: Message): void => {
                messagesService.addMessage(
                    new Message({
                        author: ladycap,
                        body: message.body,
                        thread: tLadycap
                    })
                );
            }, null);

        // echo bot
        messagesService.messagesForThreadUser(tEcho, echo)
            .forEach( (message: Message): void => {
                    console.log(`In echo bot: ${message.body}`)
                    let sendMsg = new Message()
                    messagesService.addMessage(new Message({
                        author: echo,
                        createdAt: moment().toDate(),
                        body: message.body,
                        thread: tEcho
                    }));
                },
                null);


        // reverse bot
        messagesService.messagesForThreadUser(tRev, rev)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: rev,
                            body: message.body.split('').reverse().join(''),
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
                                    body: reply,
                                    thread: tWait
                                })
                            );
                        },
                        waitTime * 1000);
                },
                null);


    }
}
