import { Component } from '@angular/core';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewPostComponent, PostComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
