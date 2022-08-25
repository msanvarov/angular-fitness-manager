import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Store } from '@fitness/store';
import {
  AppHeaderComponent,
  AppNavComponent,
  AuthModule,
  HealthModule,
} from '@fitness/ui';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { GlobalRoutes } from './routes';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent, AppNavComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(GlobalRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    providePerformance(() => getPerformance()),
    AuthModule,
    HealthModule,
  ],
  providers: [Store, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
