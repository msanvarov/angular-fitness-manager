import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthFormComponent, ListItemComponent } from './components';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [AuthFormComponent, ListItemComponent, JoinPipe, WorkoutPipe],
  exports: [AuthFormComponent, ListItemComponent, JoinPipe, WorkoutPipe],
})
export class ReusableModule {
  static forRoot() {
    return {
      ngModule: ReusableModule,
      // providers: [AuthService, AuthGuard],
      providers: [],
    };
  }
}
