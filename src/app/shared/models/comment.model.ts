/**
 * Created by zhengyuan on 2017/5/10.
 */
import { Profile } from './profile.model';

export class Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
