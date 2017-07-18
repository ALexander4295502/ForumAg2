/**
 * Created by zhengyuan on 2017/5/10.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Article,
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService
} from '../shared';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;
  comments: Comment[];
  editComment: Comment;
  commentFormErrors = {};
  ckeditorContent: string;
  editCommentActive: boolean;
  ckeditorCommentContent: string;
  deleteModalTitle: string;
  preDeleteComment: Comment;
  ckeditorOption = {
    extraPlugins: 'divarea',
    uiColor: '#2980b9',
    forcePasteAsPlainText: true,
    toolbar:
        [
          ['Source'],
          ['Preview','Cut','Copy','Paste','PasteText','PasteFromWord'],
          ['Undo','Redo','-','SelectAll','RemoveFormat'],
          '/',
          ['Bold','Italic','-','Subscript','Superscript'],
          ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
          ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
          ['Link','Unlink','Anchor'],
          ['Image','Table','SpecialChar'],
          '/',
          ['Styles','Format','FontSize'],
          ['TextColor'],
          ['Maximize', 'ShowBlocks']
        ]
  };

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
  ) { }

  @ViewChild('commentModal') commentModal:any;
  @ViewChild('deleteConfirmModal') deleteConfirmModal:any;

  ngOnInit() {
    this.ckeditorContent = "Write comment here : )";
    this.ckeditorCommentContent = "";
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;
        this.populateComments();
      }
    );
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        // console.log('current user : ',userData);
        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
    this.editCommentActive = false;
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    const commentBody = this.ckeditorContent;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.ckeditorContent = "Write comment here : )";
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.ckeditorContent = "Write comment here : )";
          this.commentFormErrors = errors;
        }
      );
  }

  onDelete(object) {
    if(object.hasOwnProperty('slug')){
      this.preDeleteComment = null;
      this.deleteModalTitle = 'article';
      this.deleteConfirmModal.open();
    } else {
      this.preDeleteComment = object;
      this.deleteModalTitle = 'comment';
      this.deleteConfirmModal.open();
    }
  }

  confirmDeleteComment(){
    this.commentsService.destroy(this.preDeleteComment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== this.preDeleteComment);
          this.deleteConfirmModal.close();
        }
      );
  }

  onEditOpen(comment) {
    this.editCommentActive = true;
    this.ckeditorCommentContent = comment.body;
    this.commentModal.open();
    this.editComment = comment;
  }

  onEditSubmit(){
    this.commentsService.update(this.editComment.id, this.article.slug, this.ckeditorCommentContent)
        .subscribe(
          comment => {
            this.comments.forEach(function (_comment) {
              if(_comment.id === comment.id) {
                _comment.body = comment.body;
                _comment.updatedAt = comment.updatedAt;
              }
            });
            this.editCommentActive = false;
            this.commentModal.close();
          },
          errors => {
            console.log("Update Comment errors: ", errors);
          }
    );
  }

}
