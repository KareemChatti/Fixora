import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private apiUrl = 'http://localhost:8888/api/workers'; 

  constructor(private http: HttpClient) {}

 
  private getAuthHeaders() {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

 
  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  
  createWorker(workerData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}`, workerData, { headers });
  }

 
  getWorkers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  
  getWorkerById(workerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${workerId}`, { headers });
  }

  
  updateWorker(workerId: string, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${workerId}`, updatedData, { headers });
  }

  deleteWorker(workerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${workerId}`, { headers });
  }
}
