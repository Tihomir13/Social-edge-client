import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NgClass, SlicePipe } from '@angular/common';

import { Subscription } from 'rxjs';

import { ImageModel } from './model/images.model';
import { PostsRequestsService } from './services/posts-requests.service';
import { UtilityService } from '../../../../../../shared/services/utility/utility.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass, SlicePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [],
})
export class PostComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  isCommentsClicked: boolean = true;
  isCollapsed = true;

  currLikes = signal<number>(0);
  localLikes: string[] = [];

  postId = input<string>('');
  username = input<string>('');
  title = input<string>('');
  text = input<string>('');
  tags = input<string[]>([]);
  likes = input<string[]>([]);
  images = input<ImageModel[]>([]);

  currentImageIndex = 0;

  private postRequests = inject(PostsRequestsService);
  utilityService = inject(UtilityService);

  ngOnInit(): void {
    this.localLikes = [...this.likes()];
    this.currLikes.set(this.localLikes.length);
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  toggleReadMore(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }

  async toggleLike(postId: string): Promise<any> {
    const username = this.utilityService.userInfo.username;

    if (this.localLikes.includes(username)) {
      const newLikes = this.localLikes.filter((user) => user !== username);
      this.currLikes.set(this.currLikes() - 1);
      this.localLikes = newLikes;
    } else {
      this.localLikes.push(username);
      this.currLikes.set(this.currLikes() + 1);
    }

    try {
      await this.postLikeDislike(postId);
    } catch (error) {
      console.log('Error syncing with server:', error);
    }
  }

  postLikeDislike(postId: string) {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.postRequests.likePost(postId).subscribe({
          next: (response) => {
            console.log(response.likes);
            this.currLikes.set(response.likes.length);
            resolve(response);
          },
          error: (error) => {
            console.log(error);
            reject(error);
          },
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
