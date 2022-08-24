import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { IUser, Store } from '@fitness/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = this.auth.onAuthStateChanged((next) => {
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
  });

  constructor(private auth: Auth, private store: Store) {}

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
