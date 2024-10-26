import { Component, OnInit } from '@angular/core';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { YesNoModalComponent } from "../../../../shared/components/yes-no-modal/yes-no-modal.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewPostComponent, PostComponent, YesNoModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  posts: any = [];

  ngOnInit(): void {
    //posts
  }
}
