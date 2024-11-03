import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { api } from '../../../shared/constants/api';

@Injectable()
export class LoginRequestsService {
  private http = inject(HttpClient);

  loginUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${api}/login`, userData, { headers });
  }
}
