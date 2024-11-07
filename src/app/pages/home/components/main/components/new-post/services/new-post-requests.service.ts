import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { api } from '../../../../../../../shared/constants/api';

@Injectable()
export class NewPostRequestsService {
  http = inject(HttpClient);

  savePost(newPost: any): Observable<Object> {
    return this.http.post(`${api}/new-posts`, newPost, {
      // headers: {
      //   Authorization:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmNlMTQyYWEwMTJhYWQ3ZDk1OTEzMiIsInVzZXJuYW1lIjoiUGljaGFnYTEyMyIsImlhdCI6MTczMDk5ODY3NiwiZXhwIjoxNzMxMDAyMjc2fQ.I8_O8ozsziy2okah_QACc7ZupaDYw9ROYwkEXc83rv4',
      // },
    });
  }
}
