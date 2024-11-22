import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FriendListComponent } from './components/friend-list/friend-list.component';
import { SuggestedProfilesComponent } from './components/suggested-profiles/suggested-profiles.component';
import { ChatHeadsComponent } from './components/chat-heads/chat-heads.component';
import { MainStateService } from './shared/main-state.service';
import { ChatComponent } from './components/chat/chat.component';
import { PostsStateService } from './components/feed/components/post/services/posts-state.service';
import { PostsRequestsService } from './components/feed/components/post/services/posts-requests.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FriendListComponent,
    SuggestedProfilesComponent,
    ChatHeadsComponent,
    ChatComponent,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [PostsStateService, PostsRequestsService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  posts = signal<any[] | null>(null);

  state = inject(MainStateService);
  postsState = inject(PostsStateService);

  ngOnInit(): void {
    this.state.currentChatHeads = this.state.currentChatHeads;
  }

  onCloseChatHead(chatHeadIndex: number): void {
    this.state.currentChatHeads = this.state.currentChatHeads.filter(
      (_, index) => index !== chatHeadIndex
    );
  }

  onProfileClick(chatHeadIndex: number): void {
    this.state.isChatActive = true;
  }

  onUserProfileClick(user: any): void {
    this.state.isChatActive = true;
  }
}
