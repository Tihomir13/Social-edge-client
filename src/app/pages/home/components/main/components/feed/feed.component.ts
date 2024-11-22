import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { PostsRequestsService } from './components/post/services/posts-requests.service';
import { GenerateNewPostForm } from './components/new-post/helpers/form-factory/new-post-form';
import { ModalService } from '../../../shared/services/modal.service';
import { NewPostStateService } from './components/new-post/services/new-post-state.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NewPostComponent, PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  subscriptions = new Subscription();
  posts = signal<any[] | null>(null);

  private postRequests = inject(PostsRequestsService);

  ngOnInit(): void {
    this.getPosts();
  }

  onNewPost(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.subscriptions.add(
      this.postRequests.getPosts().subscribe({
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
