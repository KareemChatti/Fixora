import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8888'; 

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password }, { responseType: 'text' }) 
      .pipe(
        map((response: string) => {
          return { access_token: response }; 
        })
      );
  }
}
