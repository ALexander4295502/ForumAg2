/**
 * Created by zhengyuan on 2017/5/10.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';
import { ArticleCommentComponent } from './article-comment.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SanitizeHtml } from './sanitizeHtml.pipe';

const articleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    articleRouting,
    SharedModule,
    CKEditorModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    ArticleComponent,
    ArticleCommentComponent,
    MarkdownPipe,
    SanitizeHtml
  ],

  providers: [
    ArticleResolver
  ]
})
export class ArticleModule {}
