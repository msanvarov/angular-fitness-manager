import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'schedule',
        loadChildren: () =>
          import('./schedule/schedule.module').then(
            (scheduleModule) => scheduleModule.ScheduleModule,
          ),
      },
      {
        path: 'meals',
        loadChildren: () =>
          import('./meals/meals.module').then(
            (mealsModule) => mealsModule.MealsModule,
          ),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('./workouts/workouts.module').then(
            (workoutsModule) => workoutsModule.WorkoutsModule,
          ),
      },
    ]),
  ],
})
export class HealthModule {}
