import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../../shared/constants/api';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsService {
  private http = inject(HttpClient);

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${api}/register`, userData, { headers });
  }
}
