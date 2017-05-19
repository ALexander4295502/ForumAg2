/**
 * Created by zhengyuan on 2017/5/10.
 */
import { Component, Input } from '@angular/core';
import { Article } from '../models';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() article: Article;
}
