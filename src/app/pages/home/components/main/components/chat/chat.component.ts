import { Component, inject } from '@angular/core';
import { MainStateService } from '../../shared/main-state.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  state = inject(MainStateService);

  closeChat() {
    this.state.isChatActive = false;
  }
}
