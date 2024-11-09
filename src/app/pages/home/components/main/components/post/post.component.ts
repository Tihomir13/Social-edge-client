import { Component, input, OnInit } from '@angular/core';
import { ImageModel } from './model/images.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [],
})
export class PostComponent implements OnInit {
  isCommentsClicked: boolean = true;

  username = input<string>('');
  title = input<string>('');
  text = input<string>('');
  tags = input<string[]>([]);
  likes = input<number>(0);
  images = input<ImageModel[]>([]);

  currentImageIndex = 0;

  ngOnInit() {
    console.log(this.images());
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

  get currentImage(): string {
    return this.images()[this.currentImageIndex].src;
  }

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }
}
