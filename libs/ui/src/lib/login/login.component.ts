import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../reusable/services/auth.service';

@Component({
  selector: 'fitness-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      this.error = (error as unknown as Error).message;
    }
  }
}
