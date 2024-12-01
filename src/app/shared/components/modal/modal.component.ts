import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  title = input('Title');
  // options = input<{ optionName: string; optionColor: string }[]>([]);
  clickedOption = output<string>();

  options: { optionName: string; optionColor: string }[] = [
    {
      optionName: 'Upload Photo',
      optionColor: 'purple',
    },
    {
      optionName: 'remove',
      optionColor: 'red',
    },
    {
      optionName: 'cancel',
      optionColor: 'white',
    },
  ];

  onChosenOption(optionName: string) {
    this.clickedOption.emit(optionName);
  }
}
