import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css',],
    encapsulation: ViewEncapsulation.Native
})
export class SidebarComponent implements OnInit{
    @HostBinding('style.z-index')
    private zindex;

    ngOnInit(): void {
        this.zindex = -1;
    }

}
