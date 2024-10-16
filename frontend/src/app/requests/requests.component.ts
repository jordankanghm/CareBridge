import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  description: string = '';
  editingRequest: any = null; // For tracking which request is being edited

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getRequests().subscribe((data) => {
      this.requests = data;
    });
  }

  createRequest() {
    this.requestService.createRequest({ description: this.description, userId: 1 }).subscribe(() => {
      this.loadRequests();
    });
  }

  updateRequest() {
    if (this.editingRequest) {
      this.requestService.updateRequest(this.editingRequest.id, { description: this.description }).subscribe(() => {
        this.loadRequests();
        this.editingRequest = null; // Reset editing state
        this.description = ''; // Clear input after update
      });
    }
  }

  // Method to set the request for editing
  editRequest(request: any) {
    this.editingRequest = request;
    this.description = request.description; // Populate input with the current description
  }

  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).subscribe(() => {
      this.loadRequests();
    });
  }
}
