import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

import { IWorkout } from '@fitness/store';

import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'fitness-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$?: Observable<IWorkout | undefined>;
  subscription?: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(
        (param) =>
          this.workoutsService.getWorkout(param['id']) as Observable<IWorkout>,
      ),
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async addWorkout(event: IWorkout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: IWorkout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: IWorkout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
