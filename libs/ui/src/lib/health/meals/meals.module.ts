import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReusableModule } from '../../reusable/reusable.module';
import { MealFormComponent } from './meal-form/meal-form.component';
import { MealComponent } from './meal/meal.component';
import { MealsComponent } from './meals.component';
import { MealsService } from './meals.service';

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MealsComponent },
      { path: 'new', component: MealComponent },
      { path: ':id', component: MealComponent },
    ]),
    ReusableModule,
  ],
  providers: [MealsService],
})
export class MealsModule {}
