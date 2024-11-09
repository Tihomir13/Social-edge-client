import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
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
  image = input<string>('');

  toggleComments(): void {
    this.isCommentsClicked = !this.isCommentsClicked;
  }
}
