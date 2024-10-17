import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(!!this.getLocalStorageItem('token')); // Update initialization
  public isLoggedIn$ = this.loggedIn.asObservable();

  // Helper functions
  private getLocalStorageItem(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  // Register method
  register(userData: { username: string; password: string; role: string }): Promise<any> {
    return fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then(response => response.json());
  }

  // Login method
  login(userData: { username: string; password: string }): Promise<any> {
    return fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then(response => response.json()).then(data => {
      if (data.token) {
        this.setLocalStorageItem('token', data.token); // Store token in localStorage
        this.setLocalStorageItem('role', data.role); // Store role in localStorage
        this.loggedIn.next(true); // Update login state
      }
      return data;
    });
  }

  // Log out method
  logout(): void {
    this.removeLocalStorageItem('token');
    this.removeLocalStorageItem('role'); // Remove role from localStorage
    this.loggedIn.next(false); // Update login state
  }
}
