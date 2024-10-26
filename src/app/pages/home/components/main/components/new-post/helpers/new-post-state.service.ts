import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewPostStateService {
  isCreatingNewPost = signal(false);
  globalClickListener = signal<(() => void) | null>(null);

  toggleNewPost(value: boolean = !this.isCreatingNewPost()) {
    this.isCreatingNewPost.set(value);
  }

  setGlobalClickListener(listener: () => void) {
    this.globalClickListener.set(listener);
  }

  removeGlobalClickListener() {
    if (this.globalClickListener()) {
      this.globalClickListener()!();
      this.globalClickListener.set(null);
    }
  }
}
