import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiUrl = 'http://localhost:8082/api/users/reset-password'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl, { token, newPassword });
  }
}
