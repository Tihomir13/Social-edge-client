import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  isCommentsClicked: boolean = true;
  likes: string = '2';

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }
}
