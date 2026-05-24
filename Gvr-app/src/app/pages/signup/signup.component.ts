import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthRegisterPayload, AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullName = '';
  email = '';
  password = '';
  phone = '';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  submitSignup() {
    this.error.set(null);
    this.success.set(null);

    if (!this.fullName.trim() || !this.email.trim() || !this.password.trim() || !this.phone.trim()) {
      this.error.set('Please fill in all required fields to create your account.');
      return;
    }

    const payload: AuthRegisterPayload = {
      fullName: this.fullName.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      phone: this.phone.trim()
    };

    this.loading.set(true);
    this.authService.register(payload).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setUser(response);
        this.success.set(`Welcome, ${response.fullName}. Your account is ready.`);
        this.loading.set(false);
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Unable to register. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
