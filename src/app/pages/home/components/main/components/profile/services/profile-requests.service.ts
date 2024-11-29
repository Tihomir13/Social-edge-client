import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UtilitySessionService } from '../../../../../../../shared/services/utility/utility.service';
import { api } from '../../../../../../../shared/constants/api';

@Injectable({
  providedIn: 'root',
})
export class ProfileRequestsService {
  http = inject(HttpClient);
  utility = inject(UtilitySessionService);

  headers = {
    headers: this.utility.headers,
  };

  getInitialUserData(username: string): Observable<any> {
    return this.http.get(`${api}/profiles/${username}`, this.headers);
  }

  getUserPosts(username: string): Observable<any> {
    return this.http.get(`${api}/profiles/${username}/posts`, this.headers);
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${api}/profiles/${username}/info`, this.headers);
  }
}
