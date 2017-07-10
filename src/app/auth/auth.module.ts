import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthGuard, SharedModule } from '../shared';

import { AuthResolver } from './auth-resolver.service';
import { AuthResetPasswordResolver } from './auth-resetPassword-resolver.service';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'email-verification/:url',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
    resolve: {
      user: AuthResolver
    }
  },
  {
    path: 'forgot',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'reset/:token',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
    resolve: {
      user: AuthResetPasswordResolver
    }
  },
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
    NoAuthGuard,
    AuthResolver,
    AuthResetPasswordResolver,
  ]
})
export class AuthModule {}
