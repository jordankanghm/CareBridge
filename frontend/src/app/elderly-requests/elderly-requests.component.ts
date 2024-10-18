import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestService, Request } from '../request.service';
import { AuthService } from '../auth.service'; // Import the AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-elderly-requests',
  templateUrl: './elderly-requests.component.html',
  styleUrls: ['./elderly-requests.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ElderlyRequestsComponent implements OnInit {
  requests: Request[] = [];
  userId: number | null = null;

  constructor(private requestService: RequestService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userId = this.getLocalStorageItem('userId'); // Get user ID from localStorage
    this.loadRequests(); // Load requests immediately
  }

  loadRequests() {
    if (this.userId) {
      this.requestService.getRequestsByUserId(this.userId).then((data: Request[]) => {
        this.requests = data; // Set requests to the fetched requests
      }).catch((error: any) => {
        console.error(error);
      });
    }
  }

  goBack() {
    this.router.navigate(['/requests']);
  }

  private isBrowser(): boolean {
      return typeof window !== 'undefined';
    }

  private getLocalStorageItem(key: string): any {
    if (this.isBrowser()) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null; // Parse JSON or return null
    }
    return null; // Return null or default value if not in browser
  }
}
