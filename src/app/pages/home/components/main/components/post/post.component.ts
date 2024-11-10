import { Component, input, OnInit } from '@angular/core';
import { ImageModel } from './model/images.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [],
})
export class PostComponent {
  isCommentsClicked: boolean = true;

  username = input<string>('');
  title = input<string>('');
  text = input<string>('');
  tags = input<string[]>([]);
  likes = input<number>(0);
  images = input<ImageModel[]>([]);

  currentImageIndex = 0;

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images().length;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images().length) %
      this.images().length;
  }

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }
}
