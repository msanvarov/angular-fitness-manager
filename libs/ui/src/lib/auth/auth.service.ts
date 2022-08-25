import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { tap } from 'rxjs';

import { IUser, Store } from '@fitness/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth$ = authState(this.auth).pipe(
    tap((next) => {
      console.log('Listening for auth state changes');
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: IUser = {
        email: next.email ?? 'Email not found',
        uid: next.uid,
        authenticated: true,
      };
      this.store.set('user', user);
    }),
  );

  constructor(@Optional() private auth: Auth, private store: Store) {}

  get authState() {
    return authState(this.auth);
  }

  get user() {
    return this.auth.currentUser;
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser() {
    return signOut(this.auth);
  }
}
