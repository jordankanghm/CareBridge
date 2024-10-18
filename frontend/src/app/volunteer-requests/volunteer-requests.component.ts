import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestService, Request } from '../request.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-requests',
  templateUrl: './volunteer-requests.component.html',
  styleUrls: ['./volunteer-requests.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VolunteerRequestsComponent implements OnInit {
  requests: Request[] = [];
  userId: number | null = null;

  constructor(private requestService: RequestService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userId = this.getLocalStorageItem('userId');
    this.loadRequests();
  }

  loadRequests() {
    if (this.userId) {
      this.requestService.getRequestsByUserId(this.userId).then((data: Request[]) => {
        this.requests = data;
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
      return value ? JSON.parse(value) : null;
    }
    return null;
  }
}
