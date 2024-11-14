import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UtilityService } from '../../../../../../../shared/services/utility/utility.service';
import { api } from '../../../../../../../shared/constants/api';

@Injectable()
export class PostsRequestsService {
  http = inject(HttpClient);
  utility = inject(UtilityService);

  headers = {
    headers: this.utility.headers,
  };

  getPosts(): Observable<any> {
    return this.http.get(`${api}/posts`, this.headers);
  }

  likePost(id: string): Observable<any> {
    const body = {
      id,
    };

    return this.http.patch(`${api}/posts/like`, body, this.headers);
  }
}
