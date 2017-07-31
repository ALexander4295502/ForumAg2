import { Component, HostBinding, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    @HostBinding('style.z-index')
    private zindex;

    ngOnInit(): void {
        this.zindex = 0;
    }

    clickButton(sidnav: MdSidenav): void {
        this.zindex = 3;
        sidnav.open();
    }

    sidenavOnClose(): void{
        this.zindex = 0;
    }

}
