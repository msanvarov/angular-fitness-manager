import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    // Remark: the auth service is reusabled by nature, thus it has to be put into the reusable module but should be exported with the auth module (thus the use of forRoot)
    RouterModule.forChild([
      {
        path: 'auth',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'login' },
          {
            path: 'login',
            loadChildren: () =>
              import('./login/login.module').then(
                (loginModule) => loginModule.LoginModule,
              ),
          },
          {
            path: 'register',
            loadChildren: () =>
              import('./register/register.module').then(
                (registerModule) => registerModule.RegisterModule,
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
