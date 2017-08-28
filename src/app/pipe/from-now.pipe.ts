import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
    transform(value: any, args: Array<any>): string {
        // We nolonger use the fromNowOn format here
        // cause we cannot update previous msgs once receive a new msg.
        return moment(value).format('lll');
    }
}

export const fromNowPipeInjectables: Array<any> = [
    FromNowPipe
];
