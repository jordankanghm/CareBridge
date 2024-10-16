import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  description: string = '';

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
}
