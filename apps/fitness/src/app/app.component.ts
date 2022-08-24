import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IUser, Store } from '@fitness/store';
import { AuthService } from '@fitness/ui';

@Component({
  selector: 'fitness-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$?: Observable<IUser>;
  subscription?: Unsubscribe;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription = this.authService.authState;
    this.user$ = this.store.select<IUser>('user');
    console.log('user$', this.user$);
  }

  ngOnDestroy() {
    this.subscription && this.subscription();
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
