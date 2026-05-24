import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin() {
    this.error.set(null);
    this.success.set(null);

    if (!this.email.trim() || !this.password.trim()) {
      this.error.set('Please enter both your email and password.');
      return;
    }

    this.loading.set(true);
    this.authService.login({ email: this.email.trim(), password: this.password.trim() }).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setUser(response);
        this.success.set(`Welcome back, ${response.fullName}!`);
        this.loading.set(false);
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Login failed. Please check credentials and try again.');
        this.loading.set(false);
      }
    });
  }
}
