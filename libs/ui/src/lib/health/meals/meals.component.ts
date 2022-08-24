import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IMeal, Store } from '@fitness/store';

import { MealsService } from './meals.service';

@Component({
  selector: 'fitness-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$?: Observable<IMeal[]>;
  subscription?: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<IMeal[]>('meals');
    this.subscription = this.mealsService.meals$?.subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  removeMeal(event: IMeal) {
    this.mealsService.removeMeal(event.$key);
  }
}
