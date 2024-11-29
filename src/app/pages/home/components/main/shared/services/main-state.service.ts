import { Injectable, signal } from '@angular/core';
import { PostModel } from '../../components/feed/components/post/model/post.model';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  posts = signal<any[]>([]);
  friends = signal<any[]>(['aaa']);
  currentChatHeads = signal<any[]>([]);
  isChatActive = signal<boolean>(false);

  setPosts(posts: any) {
    this.posts.set(posts);
  }
  
  setFriends(friends: any) {
    this.friends.set(friends);
  }

  setCurrChatHeads(chat: any) {
    this.currentChatHeads.set(chat);
  }

  setChat(isChatOpened: boolean) {
    this.isChatActive.set(isChatOpened);
  }
}
