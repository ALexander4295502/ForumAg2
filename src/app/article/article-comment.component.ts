/**
 * Created by zhengyuan on 2017/5/10.
 */
import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { Comment, User, UserService, CommentsService } from '../shared';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  @Output() editComment = new EventEmitter<boolean>();

  canModify: boolean;


  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
      }
    );
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

  editClicked() {
    this.editComment.emit(true);
  }




}
