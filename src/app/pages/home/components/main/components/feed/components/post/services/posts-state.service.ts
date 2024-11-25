import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsStateService {
  currentPosts = signal<Object[]>([]);

  
}
