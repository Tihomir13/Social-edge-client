import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-yes-no-modal',
  standalone: true,
  imports: [],
  templateUrl: './yes-no-modal.component.html',
  styleUrl: './yes-no-modal.component.scss',
})
export class YesNoModalComponent {
  // title = input();
  // message = input();

  title = 'Are you sure you want to delete this post?';
  message = 'Are you sure you want to delete this post?';

  option = output<boolean>();

  onClick(value: boolean) {
    this.option.emit(value);
  }
}
