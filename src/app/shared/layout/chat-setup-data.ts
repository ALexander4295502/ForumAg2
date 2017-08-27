import { User, Thread, Message } from '../models';
import { MessagesService, ThreadsService, ApiService } from '../services';
import * as moment from 'moment';

// the person using the app us Juliet
const chatbot: User = new User();
chatbot.username = 'Chatbot';
chatbot.image = '/assets/images/chatbot.png';

const tChatbot: Thread = new Thread('tChatbot', chatbot.username, chatbot.image);

const initialMessages: Array<Message> = [
    new Message({
        author: chatbot,
        createdAt: moment().subtract(20, 'minutes').toDate(),
        body: 'So shall you feel the loss, but not the friend which you weep for.',
        thread: tChatbot
    }),
];

export class ChatExampleData {

    static init(messagesService: MessagesService,
                threadsService: ThreadsService,
                apiService: ApiService,
                ): void {

        // TODO make `messages` hot
        messagesService.messages.subscribe(() => ({}));

        // create the initial messages
        initialMessages.map( (message: Message) => messagesService.addMessage(message) );

        this.setupBots(messagesService, apiService);

        threadsService.setCurrentThread(tChatbot);
    }

    static setupBots(messagesService: MessagesService, apiService: ApiService): void {

        // chatbot bot
        messagesService.messagesForThreadUser(tChatbot, chatbot)
            .forEach((message: Message): void => {
                apiService.botPost({content: message.body})
                    .subscribe(res => {
                    messagesService.addMessage(
                        new Message({
                            author: chatbot,
                            body: res.message,
                            thread: tChatbot
                        }));
                });
            }, null);


    }
}
