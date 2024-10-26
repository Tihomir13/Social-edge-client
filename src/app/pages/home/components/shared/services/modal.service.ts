import { inject, Injectable, signal } from '@angular/core';
import { NewPostStateService } from '../../main/components/new-post/helpers/new-post-state.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalToggled = signal(false);

  newPostService = inject(NewPostStateService);

  toggleModal() {
    this.isModalToggled.set(!this.isModalToggled());
  }

  chooseOption(value: boolean) {
    // console.log(value);
    // this.newPostService.toggleNewPost(value);
  }
}
