import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-heads',
  standalone: true,
  imports: [],
  templateUrl: './chat-heads.component.html',
  styleUrl: './chat-heads.component.scss',
})
export class ChatHeadsComponent {
  currentChatHeads = ['chat1', 'chat2'];
}
