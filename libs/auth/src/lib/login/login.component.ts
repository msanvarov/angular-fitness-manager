import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fitness-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor() {}

  loginUser(event: FormGroup) {
    console.log(event.value);
  }
}
