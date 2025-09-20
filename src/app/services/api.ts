// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1/simulations';

  constructor(private http: HttpClient) {}

  testConnection(body: any): Observable<any> {
    return this.http.post(this.baseUrl, body);
  }
}
