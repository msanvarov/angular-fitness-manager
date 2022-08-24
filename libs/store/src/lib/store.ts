import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface IUser {
  email: string;
  uid: string;
  authenticated: boolean;
}

export interface IMeal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
}

export interface IWorkout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
}

export interface IScheduleItem {
  meals: IMeal[] | null;
  workouts: IWorkout[] | null;
  section: string;
  timestamp: number;
  $key?: string;
}

export interface IScheduleList {
  morning?: IScheduleItem;
  lunch?: IScheduleItem;
  evening?: IScheduleItem;
  snacks?: IScheduleItem;
  [key: string]: any;
}

// This is a in memory store for managing the app state. Will be replaced with NgRx Store in the future.
export interface State {
  user?: IUser;
  meals?: IMeal[];
  selected?: any;
  schedule?: IScheduleItem[];
  type?: string;
  date?: Date;
  workouts?: IWorkout[];
  [key: string]: unknown;
}

const state: State = {
  user: undefined,
  meals: undefined,
  selected: undefined,
  schedule: undefined,
  list: undefined,
  date: undefined,
  workouts: undefined,
  type: undefined,
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
