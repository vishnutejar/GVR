import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5207/api/auth';
  currentUser = signal<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  register(payload: AuthRegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload);
  }

  login(payload: AuthLoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload);
  }

  setUser(user: AuthResponse) {
    this.currentUser.set(user);
    localStorage.setItem('gvr-current-user', JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('gvr-current-user');
  }

  private loadUser() {
    const stored = localStorage.getItem('gvr-current-user');
    if (stored) {
      try {
        this.currentUser.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem('gvr-current-user');
      }
    }
  }
}
