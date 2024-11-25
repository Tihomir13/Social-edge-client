import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UtilitySessionService } from '../../../../../../../../../shared/services/utility/utility.service';
import { api } from '../../../../../../../../../shared/constants/api';

@Injectable()
export class PostsRequestsService {
  http = inject(HttpClient);
  utility = inject(UtilitySessionService);

  headers = {
    headers: this.utility.headers,
  };

  getPosts(): Observable<any> {
    return this.http.get(`${api}/posts`, this.headers);
  }

  likePost(postId: string): Observable<any> {
    const body = {
      id: postId,
    };

    return this.http.patch(`${api}/posts/like`, body, this.headers);
  }

  commentPost(comment: string, postId: string): Observable<any> {
    const body = {
      postId,
      comment,
    };

    return this.http.patch(`${api}/posts/comment`, body, this.headers);
  }
}
