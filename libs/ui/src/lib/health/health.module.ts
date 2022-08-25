import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';
import { ReusableModule } from '../reusable/reusable.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./schedule/schedule.module').then(
            (scheduleModule) => scheduleModule.ScheduleModule,
          ),
      },
      {
        path: 'meals',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./meals/meals.module').then(
            (mealsModule) => mealsModule.MealsModule,
          ),
      },
      {
        path: 'workouts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./workouts/workouts.module').then(
            (workoutsModule) => workoutsModule.WorkoutsModule,
          ),
      },
    ]),
    ReusableModule.forRoot(),
  ],
})
export class HealthModule {}
