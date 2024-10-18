import { Injectable } from '@angular/core';

export interface Request {
  id: number;
  description: string;
  status: 'open' | 'accepted' | 'completed';
  elderlyId: number;
  volunteerId?: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private baseUrl = 'http://localhost:3000/api/requests';

  // Method to get all requests
  async getRequests(): Promise<Request[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching requests:', error);
      return [];
    }
  }

  // Method to create a request
  async createRequest(description: string, userId: number): Promise<Request> {
    try {
      const response = await fetch(`${this.baseUrl}/${userId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  }

  // Method to accept a request
  async acceptRequest(requestId: number, volunteerId: number): Promise<Request> {
    try {
      const response = await fetch(`${this.baseUrl}/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volunteerId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error accepting request:', error);
      throw error;
    }
  }

  // Method to update a request
  async updateRequest(id: number, requestData: Partial<Request>): Promise<Request> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  }

  // Method to delete a request
  async deleteRequest(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      throw error;
    }
  }

  // Method to get accepted requests
  async getAcceptedRequests(): Promise<Request[]> {
    try {
      const response = await fetch(`${this.baseUrl}/accepted`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching accepted requests:', error);
      return [];
    }
  }

  // Method to get requests by user ID
  async getRequestsByUserId(userId: number): Promise<Request[]> {
    const response = await fetch(`${this.baseUrl}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching requests: ${response.statusText}`);
    }

    return response.json();
  }
}
