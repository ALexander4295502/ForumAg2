import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListConfig, TagsService, UserService, PageViewCountService } from '../shared';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private pageViewCountService: PageViewCountService,
    private notificationsService: NotificationsService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded: boolean = false;
  pageViewCount: number = 0;

  ngOnInit() {

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if(authenticated){
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.pageViewCountService.update().subscribe(data => {
      this.pageViewCountService.get().subscribe(
          (_pageViewCount) => {
            this.pageViewCount = _pageViewCount;
          });
    });



    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  public options = {
    position: ["top", "left"],
    timeOut: 2000,
    lastOnBottom: true,
    showProgressBar: true,
    clickToClose: false,
    maxStack: 1,
    preventDuplicates: true
  };

  setListTo(type: string = '', filters: Object = {}){
    if (type === 'feed' && !this.isAuthenticated) {
      this.notificationsService.error(
          'You must login in.',
          'Wait for 2 second to login in page'
      );
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
      return;
    }
    this.listConfig = {type: type, filters: filters};
  }


}
