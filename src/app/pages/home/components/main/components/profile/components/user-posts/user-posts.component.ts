import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { PostComponent } from '../../../feed/components/post/post.component';
import { ProfileRequestsService } from '../../services/profile-requests.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [PostComponent, HttpClientModule],
  providers: [HttpClient, ProfileRequestsService],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
})
export class UserPostsComponent {
  subscriptions = new Subscription();
  posts = signal<any[] | null>(null);
  username: string | null = '';

  private profileRequestService = inject(ProfileRequestsService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.username = this.route.parent?.snapshot.paramMap.get('username')!;

    console.log(this.username);

    this.getUserPosts();
  }

  getUserPosts(): void {
    if (!this.username) {
      return;
    }

    this.subscriptions.add(
      this.profileRequestService.getUserPosts(this.username).subscribe({
        next: (response: any) => {
          console.log(response);

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
