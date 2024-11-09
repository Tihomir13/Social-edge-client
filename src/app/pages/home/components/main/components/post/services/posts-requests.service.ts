import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UtilityService } from '../../../../../../../shared/services/utility/utility.service';
import { api } from '../../../../../../../shared/constants/api';

@Injectable()
export class PostsRequestsService {
  http = inject(HttpClient);
  utility = inject(UtilityService);

  getPosts() {
    return this.http.get(`${api}/posts`, {
      headers: this.utility.headers,
    });
  }
}
