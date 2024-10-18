import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken()); // Check token on initialization
  public isLoggedIn$ = this.loggedIn.asObservable();
  private userRoleSubject = new BehaviorSubject<string | null>(this.getLocalStorageItem('role'));
  public userRole$ = this.userRoleSubject.asObservable();

  // Helper functions
  private checkToken(): boolean {
    // Check if the token exists in localStorage
    return !!this.getLocalStorageItem('token');
  }

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
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          this.setLocalStorageItem('token', data.token);
          this.setLocalStorageItem('role', data.role);
          this.setLocalStorageItem('userId', data.userId);
          this.loggedIn.next(true);
          this.userRoleSubject.next(data.role);
        }
        return data;
      });
  }

  // Log out method
  logout(): void {
    this.removeLocalStorageItem('token');
    this.removeLocalStorageItem('role');
    this.removeLocalStorageItem('userId');
    this.loggedIn.next(false);
    this.userRoleSubject.next(null);
  }
}
