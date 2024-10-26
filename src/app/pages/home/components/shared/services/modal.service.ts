import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalToggled = signal(false);

  toggleModal() {
    console.log(this.isModalToggled());
    
    this.isModalToggled.set(!this.isModalToggled());
  }
}
