import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../reusable/services/auth.service';

@Component({
  selector: 'fitness-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      this.error = (error as unknown as Error).message;
    }
  }
}
