import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:3000/api/requests';

  // Fetch GET requests
  getRequests(): Promise<any[]> {
    return fetch(this.apiUrl).then(response => response.json());
  }

  // Fetch POST request
  createRequest(request: any): Promise<any> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(response => response.json());
  }

  // Fetch PUT request
  updateRequest(id: number, request: any): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(response => response.json());
  }

  // Fetch DELETE request
  deleteRequest(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    }).then(response => response.json());
  }
}
