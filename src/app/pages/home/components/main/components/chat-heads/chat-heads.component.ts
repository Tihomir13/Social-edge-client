import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-chat-heads',
  standalone: true,
  imports: [],
  templateUrl: './chat-heads.component.html',
  styleUrl: './chat-heads.component.scss',
})
export class ChatHeadsComponent implements OnInit {
  currentChatHeads = input<string[]>();
  close = output<number>();

  ngOnInit(): void {}

  onClose(chatHeadIndex: number): void {
    this.close.emit(chatHeadIndex);
  }
}
