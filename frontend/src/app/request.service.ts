import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRequest(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  updateRequest(id: number, request: any): Observable<any> {
   return this.http.put(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: number): Observable<any> {
   return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
