import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.populate();
  }

    clickButton(sidnav: MdSidenav): void {
        sidnav.open();
    }

    sidenavOnOpen(): void{

    }

    sidenavOnClose(): void{

    }
}
