import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthModule } from '@fitness/auth';
import { Store } from '@fitness/store';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { GlobalRoutes } from './routes';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(GlobalRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
    AuthModule,
  ],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}

// {
//   apiKey: "AIzaSyAi0LcjU37xCP3-vKNK5ilw_oJiG5t5ig8",
//   authDomain: "fitness-61884.firebaseapp.com",
//   databaseURL: "https://fitness-61884-default-rtdb.firebaseio.com",
//   projectId: "fitness-61884",
//   storageBucket: "fitness-61884.appspot.com",
//   messagingSenderId: "24242314841",
//   appId: "1:24242314841:web:90e3a8f935d4fe41715b48",
//   measurementId: "G-33SBZ5MTFL"
// }
