import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { IUser, Store } from '@fitness/store';
import { AuthService } from '@fitness/ui';

@Component({
  selector: 'fitness-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$?: Observable<IUser>;
  subscription?: Subscription | null;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<IUser>('user');
    console.log('user$', this.user$);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
