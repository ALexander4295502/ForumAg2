import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User, UserService } from '../shared';

@Injectable()
export class AuthResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        return this.userService.emailVerify(route.params['url'])
            .map(data => {
                if(data['err'] != null){
                    this.router.navigateByUrl('/');
                }
            })

    }
}
