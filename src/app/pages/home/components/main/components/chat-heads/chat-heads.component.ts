import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-chat-heads',
  standalone: true,
  imports: [],
  templateUrl: './chat-heads.component.html',
  styleUrl: './chat-heads.component.scss',
})
export class ChatHeadsComponent {
  currentChatHeads = input<string[]>();
  close = output<number>();
  open = output<number>();

  onProfileClick(chatHeadIndex:number): void {
    this.open.emit(chatHeadIndex);
  }

  onClose(chatHeadIndex: number): void {
    this.close.emit(chatHeadIndex);
  }
}
