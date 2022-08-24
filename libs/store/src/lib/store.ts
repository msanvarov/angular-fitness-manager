import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface IUser {
  email: string;
  uid: string;
  authenticated: boolean;
}

// This is a in memory store for managing the app state. Will be replaced with NgRx Store in the future.
export interface State {
  user?: IUser;
  [key: string]: unknown;
}

const state: State = {
  user: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<R>(name: string): Observable<R> {
    // hack to get around the fact that the state is of type unknown but casting this to generic R will cause a compilation error.
    return this.store.pipe(map((x) => x[name] as R));
  }

  set(name: string, value: unknown) {
    this.subject.next({ ...this.value, [name]: value });
  }
}
