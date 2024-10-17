import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  description: string = '';
  editingRequest: any = null;
  userRole: string | null = null; // To store the user's role

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.loadRequests();
    // Retrieve the user's role from localStorage
    this.userRole = localStorage.getItem('role');
  }

  loadRequests() {
    this.requestService.getRequests().then((data: any) => {
      this.requests = data;
    }).catch((error) => {
      console.error(error);
    });
  }

  createRequest() {
    if (this.userRole === 'elderly') {
      this.requestService.createRequest({ description: this.description, userId: 1 }).then(() => {
        this.loadRequests();
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  updateRequest() {
    if (this.editingRequest) {
      this.requestService.updateRequest(this.editingRequest.id, { description: this.description }).then(() => {
        this.loadRequests();
        this.editingRequest = null;
        this.description = '';
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  editRequest(request: any) {
    this.editingRequest = request;
    this.description = request.description;
  }

  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).then(() => {
      this.loadRequests();
    }).catch((error) => {
      console.error(error);
    });
  }
}
