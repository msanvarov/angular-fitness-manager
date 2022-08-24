import { Injectable } from '@angular/core';
import {
  Database,
  objectVal,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';
import { filter, map, of, tap } from 'rxjs';

import { IWorkout, Store } from '@fitness/store';

import { AuthService } from '../../auth';

@Injectable()
export class WorkoutsService {
  workoutsRef = ref(this.db, `workouts/${this.uid}`);
  workouts$ = objectVal(this.workoutsRef).pipe(
    traceUntilFirst('database/workouts'),
    map((workouts) => {
      return Object.entries(workouts as Record<string, IWorkout>).map(
        ([key, workout]) => ({
          ...workout,
          $key: key,
        }),
      );
    }),
    tap((next) => {
      this.store.set('workouts', next);
    }),
  );

  constructor(
    private store: Store,
    private db: Database,
    private authService: AuthService,
  ) {}

  get uid() {
    return this.authService.user?.uid;
  }

  getWorkout(key: string) {
    if (!key) return of({});
    return this.store.select<IWorkout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts) =>
        workouts.find((workout: IWorkout) => workout.$key === key),
      ),
    );
  }

  addWorkout(workout: IWorkout) {
    return push(this.workoutsRef, workout);
  }

  updateWorkout(key: string, workout: IWorkout) {
    return update(ref(this.db, `workouts/${this.uid}/${key}`), workout);
  }

  removeWorkout(key: string) {
    return remove(ref(this.db, `workouts/${this.uid}/${key}`));
  }
}
