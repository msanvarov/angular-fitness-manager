import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fitness-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor() {}

  registerUser(event: FormGroup) {
    console.log(event.value);
  }
}
