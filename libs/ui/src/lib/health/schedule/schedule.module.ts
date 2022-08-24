import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReusableModule } from '../../reusable/reusable.module';
import { MealsService } from '../meals/meals.service';
import { WorkoutsService } from '../workouts/workouts.service';
import { ScheduleAssignComponent } from './schedule-assign/schedule-assign.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './schedule-section/schedule-section.component';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ScheduleComponent }]),
    ReusableModule,
  ],
  providers: [ScheduleService, MealsService, WorkoutsService],
})
export class ScheduleModule {}
