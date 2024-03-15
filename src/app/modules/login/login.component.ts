import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['user', Validators.required],
    password: ['password', Validators.required]
  });
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Login successful');
        } else {
          console.log('Login failed');
          this.message = 'Invalid credentials';
        }
      });
  }
}
