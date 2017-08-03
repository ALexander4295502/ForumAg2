import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor.module';
import { ArticleModule } from './article/article.module';
import { MdSidenavModule, MdButtonModule } from '@angular/material';
import {
  ApiService,
  UserService,
  FooterComponent,
  HeaderComponent,
  CommentsService,
  JwtService,
  SharedModule,
  ProfilesService,
  TagsService,
  AuthGuard,
  ArticlesService,
  PageViewCountService,
  SidebarComponent
} from './shared';
import { ChatModule } from './chat/chat.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    ProfileModule,
    ArticleModule,
    HomeModule,
    rootRouting,
    SharedModule,
    SettingsModule,
    EditorModule,
    ChatModule,
    MdSidenavModule,
    MdButtonModule,
  ],
  providers: [
    ArticlesService,
    AuthGuard,
    CommentsService,
    ApiService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    PageViewCountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
