import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IWorkout, Store } from '@fitness/store';

import { WorkoutsService } from './workouts.service';

@Component({
  selector: 'fitness-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$?: Observable<IWorkout[]>;
  subscription?: Subscription;

  constructor(private store: Store, private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workouts$ = this.store.select<IWorkout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  removeWorkout(event: IWorkout) {
    this.workoutsService.removeWorkout(event.$key);
  }
}
