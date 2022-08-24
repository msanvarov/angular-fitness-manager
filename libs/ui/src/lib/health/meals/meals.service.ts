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

import { IMeal, Store } from '@fitness/store';

import { AuthService } from '../../auth';

@Injectable()
export class MealsService {
  mealsRef = ref(this.db, `meals/${this.uid}`);
  meals$ = objectVal(this.mealsRef).pipe(
    traceUntilFirst('database/meals'),
    map((meals) =>
      Object.entries(meals as Record<string, IMeal>).map(([key, meal]) => ({
        ...meal,
        $key: key,
      })),
    ),
    tap((next) => {
      this.store.set('meals', next);
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

  getMeal(key: string) {
    // Remark: EMPTY completes the observable, so the next won't be triggered. Meaning tap operators won't work if they depend on the next. So instead of using tap, we use of({}) to trigger the next
    if (!key) return of({} as IMeal);
    return this.store.select<IMeal[]>('meals').pipe(
      filter(Boolean),
      map((meals) => meals.find((meal: IMeal) => meal.$key === key)),
    );
  }

  addMeal(meal: IMeal) {
    return push(this.mealsRef, meal);
  }

  updateMeal(key: string, meal: IMeal) {
    return update(ref(this.db, `meals/${this.uid}/${key}`), meal);
  }

  removeMeal(key: string) {
    return remove(ref(this.db, `meals/${this.uid}/${key}`));
  }
}
