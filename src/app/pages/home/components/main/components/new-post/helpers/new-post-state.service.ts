import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewPostStateService {
  isCreatingNewPost = signal(false);

  toggleNewPost(value: boolean = !this.isCreatingNewPost()) {
    this.isCreatingNewPost.set(value);
  }
}
