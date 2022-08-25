import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReusableModule } from '../../reusable/reusable.module';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutTypeComponent } from './workout-type/workout-type.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsComponent } from './workouts.component';
import { WorkoutsService } from './workouts.service';

@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: WorkoutsComponent },
      { path: 'new', component: WorkoutComponent },
      { path: ':id', component: WorkoutComponent },
    ]),
    ReusableModule,
  ],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
