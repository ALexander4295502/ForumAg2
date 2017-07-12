/**
 * Created by zhengyuan on 2017/5/10.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    CKEditorModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})
export class EditorModule {}
