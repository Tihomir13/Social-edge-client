import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  get headers():
    | {
        Authorization: string;
      }
    | undefined {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `${token}` } : undefined;
  }
}
