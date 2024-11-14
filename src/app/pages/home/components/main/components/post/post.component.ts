import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NgClass, SlicePipe } from '@angular/common';

import { Subscription } from 'rxjs';

import { ImageModel } from './model/images.model';
import { PostsRequestsService } from './services/posts-requests.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass, SlicePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [],
})
export class PostComponent implements OnInit {
  subscriptions = new Subscription();

  isCommentsClicked: boolean = true;
  isCollapsed = true;

  currLikes = signal<number>(0);

  postId = input<string>('');
  username = input<string>('');
  title = input<string>('');
  text = input<string>('');
  tags = input<string[]>([]);
  likes = input<number>(0);
  images = input<ImageModel[]>([]);

  currentImageIndex = 0;

  private postRequests = inject(PostsRequestsService);

  ngOnInit(): void {
    this.currLikes.set(this.likes());
  }

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images().length;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images().length) %
      this.images().length;
  }

  toggleReadMore(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }

  toggleLike(id: string): void {
    console.log(id);
    this.subscriptions.add(
      this.postRequests.likePost(id).subscribe({
        next: (response) => {
          console.log(response.likes);
          this.currLikes.set(response.likes.length);
        },

        error: (error) => {
          console.log(error);
        },
      })
    );
  }
}
