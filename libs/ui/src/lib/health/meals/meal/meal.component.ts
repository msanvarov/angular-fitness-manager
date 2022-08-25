import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

import { IMeal } from '@fitness/store';

import { MealsService } from '../meals.service';

@Component({
  selector: 'fitness-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/food.svg" />
          <span *ngIf="meal$ | async as meal; else title">
            {{ meal.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title> Loading... </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading">
        <fitness-meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal()"
        >
        </fitness-meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/loading.svg" />
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `,
})
export class MealComponent implements OnInit, OnDestroy {
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  meal$?: Observable<IMeal | undefined>;
  subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap((param) => this.mealsService.getMeal(param['id'])),
    );
    console.log(this.meal$);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async addMeal(event: IMeal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: IMeal) {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal() {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
