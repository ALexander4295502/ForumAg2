import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User, UserService } from '../shared';

@Injectable()
export class AuthResetPasswordResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.userService.getResetPasswordUser(route.params['token'])
            .map(user => {
                if(user != null){
                    return user;
                } else {
                    this.router.navigateByUrl('/');
                }
            })

    }
}
