import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
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

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.authState;
    this.user$ = this.store.select<IUser>('user');
  }

  ngOnDestroy() {
    this.subscription && this.subscription();
  }
}
