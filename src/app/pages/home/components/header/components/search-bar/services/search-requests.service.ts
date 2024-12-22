import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UtilitySessionService } from '../../../../../../../shared/services/utility/utility.service';
import { api } from '../../../../../../../shared/constants/api';

@Injectable({
  providedIn: 'root'
})
export class SearchRequestsService {
  http = inject(HttpClient);
  utility = inject(UtilitySessionService);

  get headers(): HttpHeaders {
    return this.utility.headers ? new HttpHeaders(this.utility.headers) : new HttpHeaders();
  }

  getSearchedProfiles(searchedText: string): Observable<any> {
    return this.http.get(`${api}/search/${searchedText}`, { headers: this.headers });
  }
}
