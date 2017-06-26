import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { PageViewCount } from '../models';

@Injectable()
export class PageViewCountService {
    constructor (
        private apiService: ApiService
    ) {}

    get(): Observable<number> {
        return this.apiService.get('/viewcount/').map(data => data.pageViewCount.viewCount);
    }

    update(): Observable<PageViewCount> {
        return this.apiService.put('/viewcount');
    }

}
