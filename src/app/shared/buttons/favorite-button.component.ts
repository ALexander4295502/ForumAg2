import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../models';
import { ArticlesService, UserService } from '../services';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService,
    private _service: NotificationsService
  ) {}

  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

    public options = {
        position: ["top", "left"],
        timeOut: 2000,
        lastOnBottom: true,
        showProgressBar: true,
        clickToClose: false,
        maxStack: 1,
        preventDuplicates: true
    };


  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this._service.error(
              'You must login in.',
              'Wait for 2 second to login in page'
          );
          setTimeout(() => {
              this.router.navigateByUrl('/login');
          }, 2000);
          return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          this.articlesService.favorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              },
              err => this.isSubmitting = false
            );

          // Otherwise, unfavorite the article
        } else {
          this.articlesService.unfavorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              },
              err => this.isSubmitting = false
            );
        }

      }
    );
  }

}
