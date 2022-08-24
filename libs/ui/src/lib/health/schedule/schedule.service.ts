import { Injectable } from '@angular/core';
import {
  Database,
  endAt,
  objectVal,
  orderByChild,
  push,
  query,
  ref,
  startAt,
  update,
} from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { IScheduleItem, IScheduleList, Store } from '@fitness/store';

import { AuthService } from '../../auth';

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();
  scheduleRef = ref(this.db, `schedule/${this.uid}`);

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.$key;

      const defaults: IScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    }),
  );

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next)),
  );
  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next)),
  );

  // TODO: better typing for observable
  schedule$: Observable<IScheduleItem[]> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next)),
    map((day: any) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      ).getTime();

      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1,
        ).getTime() - 1;

      console.log(startAt, endAt);
      return { startAt, endAt };
    }),
    switchMap(({ startAt: startAtTime, endAt: endAtTime }: any) =>
      objectVal(
        query(
          this.scheduleRef,
          orderByChild('timestamp'),
          startAt(startAtTime),
          endAt(endAtTime),
        ),
      ).pipe(
        traceUntilFirst('database/schedule'),
        map((schedules) => {
          if (schedules) {
            return Object.entries(
              schedules as Record<string, IScheduleItem>,
            ).map(([key, schedule]) => ({
              ...schedule,
              $key: key,
            }));
          } else {
            return [];
          }
        }),
      ),
    ),
    map((data: any) => {
      const mapped: IScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next)),
  );

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: Database,
  ) {}

  get uid() {
    return this.authService.user?.uid;
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private createSection(payload: IScheduleItem) {
    return push(this.scheduleRef, payload);
  }

  private updateSection(key: string, payload: IScheduleItem) {
    // removing $key from payload to prevent firebase from crashing
    delete payload.$key;
    return update(ref(this.db, `schedule/${this.uid}/${key}`), payload);
  }
}
