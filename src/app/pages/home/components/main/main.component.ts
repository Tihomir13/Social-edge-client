import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { map, Subscription } from 'rxjs';

import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { SuggestedProfilesComponent } from './components/suggested-profiles/suggested-profiles.component';
import { ChatHeadsComponent } from './components/chat-heads/chat-heads.component';
import { MainStateService } from './shared/main-state.service';
import { ChatComponent } from './components/chat/chat.component';
import { PostsStateService } from './components/post/services/posts-state.service';
import { PostsRequestsService } from './components/post/services/posts-requests.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NewPostComponent,
    PostComponent,
    FriendListComponent,
    SuggestedProfilesComponent,
    ChatHeadsComponent,
    ChatComponent,
    HttpClientModule,
  ],
  providers: [PostsStateService, PostsRequestsService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  newPostFormGroup = input<FormGroup>();
  subscriptions = new Subscription();
  posts = signal<any[] | null>(null);

  state = inject(MainStateService);
  postsState = inject(PostsStateService);
  private postRequests = inject(PostsRequestsService);

  ngOnInit(): void {
    this.state.currentChatHeads = this.state.currentChatHeads;

    this.subscriptions.add(
      this.postRequests
        .getPosts()
        .subscribe({
          next: (response: any) => {
            console.log(response);
            console.log(response.posts);

            this.posts.set(response.posts);
          },
          error: (error) => {
            console.log(error);
          },
        })
    );
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
