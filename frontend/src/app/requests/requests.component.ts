import { Component, OnInit } from '@angular/core';
import { RequestService, Request } from '../request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = []; // All requests that have not been accepted
  description: string = ''; // To hold the new request description
  userRole: string | null = null; // User role (elderly, volunteer, admin)
  isLoggedIn: boolean = false; // Track login status
  private subscriptions: Subscription = new Subscription(); // Store subscriptions


  constructor(private requestService: RequestService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions.add(this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadRequests();
      } else {
        this.router.navigate(['/login']);
      }
    }));

    this.subscriptions.add(this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadRequests() {
    this.requestService.getRequests().then((data: Request[]) => {
      this.requests = data;
    }).catch((error: any) => {
      console.error(error);
    });
  }

  createRequest() {
    if (this.description.trim()) {
      const userId = Number(this.getLocalStorageItem('userId'));

      this.requestService.createRequest(this.description, userId).then((createdRequest: Request) => {
        this.requests.push(createdRequest); // Append the new request to the list
        this.description = ''; // Clear the description input
      }).catch((error: any) => {
        console.error(error);
      });
    }
  }

  acceptRequest(request: Request) {
    const volunteerId = Number(this.getLocalStorageItem('userId'));
    this.requestService.acceptRequest(request.id, volunteerId).then(() => {
    this.requests = this.requests.filter(r => r.id !== request.id);
    }).catch((error: any) => {
      console.error(error);
    });
  }

  navigateToMyRequests(role: string) {
    if (role === 'elderly') {
      this.router.navigate(['/elderly-requests']);
    } else if (role === 'volunteer') {
      this.router.navigate(['/volunteer-requests']);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getLocalStorageItem(key: string): any {
    if (this.isBrowser()) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  // Helper method to set an item in localStorage
  private setLocalStorageItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Helper method to remove an item from localStorage
  private removeLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Helper method to clear localStorage
  private clearLocalStorage(): void {
    localStorage.clear();
  }
}
