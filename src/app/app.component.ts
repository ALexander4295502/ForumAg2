import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './shared';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  constructor (
    private router: Router,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    this.userService.populate();
      this.userService.isAuthenticated.subscribe(
          (authenticated) => {
              this.isAuthenticated = authenticated;
          }
      );
  }

    clickButton(sidnav: MatSidenav): void {
        if (!this.isAuthenticated) {
            this.notificationsService.error(
                'You must login in.',
                'Wait for 2 second to login in page'
            );
            setTimeout(() => {
                this.router.navigateByUrl('/login');
            }, 2000);
            return;
        }
        sidnav.open();
    }

    sidenavOnOpen(): void{

    }

    sidenavOnClose(): void{

    }
}
