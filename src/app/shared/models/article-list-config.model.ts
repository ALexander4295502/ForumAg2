/**
 * Created by zhengyuan on 2017/5/11.
 */
export class ArticleListConfig {
  type: string = 'all';
  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  } = [];
}
